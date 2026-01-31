# React Native Performance Rules (Kompakt)

> **Nur unklare/spezifische Regeln** - React-Grundlagen wie `memo()`, Keys, Cleanup werden vorausgesetzt.
> Für Details: `REACT-NATIVE-RULES-1.md`, `REACT-NATIVE-RULES-2.md`, `REACT-NATIVE-RULES-3.md`

---

## 1. 🚨 List Performance (CRITICAL)

### 1.1 Immer Virtualizer verwenden
```tsx
// ❌ ScrollView mit map - rendert ALLE Items
<ScrollView>{items.map(item => <Item key={item.id} />)}</ScrollView>

// ✅ LegendList/FlashList - nur sichtbare Items
import { LegendList } from '@legendapp/list'
<LegendList data={items} renderItem={({item}) => <Item item={item} />} />
```

### 1.2 Stabile Object-Referenzen (KRITISCH)
```tsx
// ❌ Map vor Liste - neue Referenzen bei jedem Render
const domains = tlds.map(tld => ({ domain: `${keyword}.${tld.name}` }))
<LegendList data={domains} />

// ✅ Stabile Daten, Transform im Item
<LegendList data={tlds} renderItem={({item}) => <DomainItem tld={item} />} />
// Im DomainItem: const domain = useKeywordStore(s => s.keyword + '.' + tld.name)
```

### 1.3 Primitive Props für Memoization
```tsx
// ❌ Object-Prop - Reference-Check schlägt fehl
<UserRow user={item} />

// ✅ Primitive Props - shallow comparison funktioniert
<UserRow id={item.id} name={item.name} email={item.email} />
```

### 1.4 Callbacks hoisten
```tsx
// ❌ Neue Callback-Instanz pro Render
renderItem={({item}) => <Item onPress={() => handle(item.id)} />}

// ✅ Eine Callback-Instanz, ID im Child
const onPress = useCallback((id) => handle(id), [handle])
renderItem={({item}) => <Item id={item.id} onPress={onPress} />}
```

### 1.5 Heterogene Listen mit getItemType
```tsx
// ✅ Separate Recycling-Pools pro Typ
<LegendList
  data={items}
  getItemType={(item) => item.type} // 'header' | 'message' | 'image'
  renderItem={({item}) => {
    switch(item.type) {
      case 'header': return <HeaderRow />
      case 'message': return <MessageRow />
      case 'image': return <ImageRow />
    }
  }}
  recycleItems
/>
```

### 1.6 Lightweight List Items
- ❌ Kein Data-Fetching in List Items
- ❌ Keine teuren Berechnungen
- ❌ Minimale Context-Zugriffe (Zustand-Selectors bevorzugen)
- ✅ Parent fetcht, Props weitergeben

---

## 2. 🎬 Animation (HIGH)

### 2.1 Nur transform/opacity animieren
```tsx
// ❌ height animieren - Layout-Recalculation pro Frame
useAnimatedStyle(() => ({ height: withTiming(expanded ? 200 : 0) }))

// ✅ scaleY/translateY - GPU-beschleunigt
useAnimatedStyle(() => ({
  transform: [{ scaleY: withTiming(expanded ? 1 : 0) }],
  opacity: withTiming(expanded ? 1 : 0)
}))
```

### 2.2 useDerivedValue statt useAnimatedReaction
```tsx
// ❌ Reaction für Ableitung
useAnimatedReaction(() => progress.value, (p) => { opacity.value = 1 - p })

// ✅ Derived Value
const opacity = useDerivedValue(() => 1 - progress.get())
```

### 2.3 GestureDetector für Press-Animationen
```tsx
// ✅ UI-Thread, kein JS-Roundtrip
const pressed = useSharedValue(0)
const tap = Gesture.Tap()
  .onBegin(() => pressed.set(withTiming(1)))
  .onFinalize(() => pressed.set(withTiming(0)))
  .onEnd(() => runOnJS(onPress)())

<GestureDetector gesture={tap}>
  <Animated.View style={useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(pressed.get(), [0, 1], [1, 0.95]) }]
  }))}>
```

---

## 3. 📜 Scroll Performance (HIGH)

### 3.1 NIEMALS useState für Scroll-Position
```tsx
// ❌ Re-Render pro Frame
const [scrollY, setScrollY] = useState(0)
onScroll={(e) => setScrollY(e.nativeEvent.contentOffset.y)}

// ✅ UI-Thread, kein Re-Render
const scrollY = useSharedValue(0)
const onScroll = useAnimatedScrollHandler({
  onScroll: (e) => { scrollY.value = e.contentOffset.y }
})
<Animated.ScrollView onScroll={onScroll} scrollEventThrottle={16} />
```

---

## 4. 🧭 Navigation (HIGH)

### 4.1 Native Navigators verwenden
```tsx
// ❌ JS Stack (langsam)
import { createStackNavigator } from '@react-navigation/stack'

// ✅ Native Stack (performant)
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// oder expo-router (nutzt native-stack automatisch)
import { Stack } from 'expo-router'
```

### 4.2 Native Tabs
```tsx
// ❌ JS Tabs
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// ✅ Native Tabs
import { createNativeBottomTabNavigator } from '@bottom-tabs/react-navigation'
// oder expo-router native tabs
import { NativeTabs } from 'expo-router/unstable-native-tabs'
```

### 4.3 Native Headers nutzen
```tsx
// ❌ Custom Header Component
options={{ header: () => <CustomHeader /> }}

// ✅ Native Header Options
options={{
  title: 'Profile',
  headerLargeTitleEnabled: true,
  headerSearchBarOptions: { placeholder: 'Search' }
}}
```

---

## 5. 🧠 State Architecture (MEDIUM)

### 5.1 State = Ground Truth, Visuals ableiten
```tsx
// ❌ Visuellen Output speichern
const scale = useSharedValue(1)
tap.onBegin(() => scale.set(withTiming(0.95)))

// ✅ State speichern, Visual ableiten
const pressed = useSharedValue(0) // 0 = nicht gedrückt, 1 = gedrückt
tap.onBegin(() => pressed.set(withTiming(1)))
// In animatedStyle:
transform: [{ scale: interpolate(pressed.get(), [0, 1], [1, 0.95]) }]
```

### 5.2 Fallback State statt Initial State
```tsx
// ❌ Initial State - verliert Reaktivität
const [enabled, setEnabled] = useState(defaultEnabled)

// ✅ Fallback - reaktiv
const [_enabled, setEnabled] = useState<boolean | undefined>(undefined)
const enabled = _enabled ?? defaultEnabled
```

### 5.3 Dispatch Updater bei abhängigem State
```tsx
// ❌ Direkt lesen - Stale Closure möglich
const onLayout = (e) => {
  if (size?.width !== width) setSize({ width, height })
}

// ✅ Dispatch Updater - immer aktuell
const onLayout = (e) => {
  const { width, height } = e.nativeEvent.layout
  setSize(prev => {
    if (prev?.width === width && prev?.height === height) return prev
    return { width, height }
  })
}
```

---

## 6. ⚛️ React Compiler Kompatibilität (MEDIUM)

### 6.1 Früh destrukturieren
```tsx
// ❌ Dotting - instabile Referenzen
const router = useRouter()
const handlePress = () => router.push('/success')

// ✅ Destrukturieren - stabile Referenzen
const { push } = useRouter()
const handlePress = () => push('/success')
```

### 6.2 Reanimated: .get()/.set() statt .value
```tsx
// ❌ Bricht mit React Compiler
count.value = count.value + 1

// ✅ React Compiler kompatibel
count.set(count.get() + 1)
```

---

## 7. 🎨 UI Patterns (HIGH)

### 7.1 expo-image statt Image
```tsx
// ✅ Mit Blurhash, Caching, Priority
import { Image } from 'expo-image'
<Image
  source={{ uri: url }}
  placeholder={{ blurhash: 'LGF5]+Yk...' }}
  contentFit="cover"
  transition={200}
  priority="high"
  cachePolicy="memory-disk"
/>
```

### 7.2 Galeria für Lightbox
```tsx
import { Galeria } from '@nandorojo/galeria'
<Galeria urls={urls}>
  {urls.map((url, i) => (
    <Galeria.Image index={i} key={url}>
      <Image source={{ uri: url }} />
    </Galeria.Image>
  ))}
</Galeria>
```

### 7.3 zeego für Native Menus
```tsx
import * as DropdownMenu from 'zeego/dropdown-menu'
<DropdownMenu.Root>
  <DropdownMenu.Trigger><Pressable><Text>Open</Text></Pressable></DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item key="edit" onSelect={() => {}}>
      <DropdownMenu.ItemTitle>Edit</DropdownMenu.ItemTitle>
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

### 7.4 Native Modals statt JS Bottom Sheets
```tsx
// ❌ JS Bottom Sheet Library
<BottomSheet snapPoints={['50%', '90%']} />

// ✅ Native Modal
<Modal presentationStyle="formSheet" animationType="slide">

// oder React Navigation v7
options={{ presentation: 'formSheet', sheetAllowedDetents: 'fitToContents' }}
```

### 7.5 Pressable statt TouchableOpacity
```tsx
// ❌ Legacy
<TouchableOpacity activeOpacity={0.7}>

// ✅ Modern
import { Pressable } from 'react-native'
<Pressable>
// oder in Listen:
import { Pressable } from 'react-native-gesture-handler'
```

### 7.6 contentInsetAdjustmentBehavior für Safe Areas
```tsx
// ❌ SafeAreaView Wrapper oder manuelles Padding
<SafeAreaView><ScrollView /></SafeAreaView>

// ✅ Native Handling
<ScrollView contentInsetAdjustmentBehavior="automatic">
```

---

## 8. 🎨 Modern Styling (MEDIUM)

### 8.1 gap statt margin
```tsx
// ❌ Margin auf Children
<View><Text style={{ marginBottom: 8 }}>A</Text><Text>B</Text></View>

// ✅ Gap auf Parent
<View style={{ gap: 8 }}><Text>A</Text><Text>B</Text></View>
```

### 8.2 borderCurve für smooth corners
```tsx
{ borderRadius: 12, borderCurve: 'continuous' }
```

### 8.3 CSS Shadows und Gradients
```tsx
// ✅ Modern Shadow
{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }

// ✅ Native Gradient
{ experimental_backgroundImage: 'linear-gradient(to bottom, #000, #fff)' }
```

### 8.4 Hierarchie durch Weight/Color, nicht Size
```tsx
// ❌ Viele Schriftgrößen
<Text style={{ fontSize: 18 }}>Title</Text>
<Text style={{ fontSize: 12 }}>Caption</Text>

// ✅ Konsistente Größe, Weight/Color für Hierarchie
<Text style={{ fontWeight: '600' }}>Title</Text>
<Text style={{ color: '#999' }}>Caption</Text>
```

---

## 9. 📦 Monorepo (LOW)

### 9.1 Native Deps in App installieren
Native Packages (reanimated, gesture-handler) MÜSSEN in `packages/app/package.json` sein, nicht nur in shared packages - sonst funktioniert Autolinking nicht.

### 9.2 Exakte Versionen, keine Ranges
```json
// ❌ "react-native-reanimated": "^3.0.0"
// ✅ "react-native-reanimated": "3.16.1"
```

---

## 10. ⚡ Quick Reference

| Kategorie | Regel | Impact |
|-----------|-------|--------|
| Lists | LegendList/FlashList statt ScrollView | CRITICAL |
| Lists | Stabile Object-Referenzen | CRITICAL |
| Lists | Primitive Props für memo() | HIGH |
| Animation | Nur transform/opacity | HIGH |
| Animation | useDerivedValue > useAnimatedReaction | MEDIUM |
| Scroll | useSharedValue > useState | HIGH |
| Navigation | native-stack, native-tabs | HIGH |
| State | Ground Truth, Visuals ableiten | MEDIUM |
| Compiler | .get()/.set() für Reanimated | MEDIUM |
| UI | expo-image, zeego, native modals | HIGH |
| Styling | gap, borderCurve, boxShadow | MEDIUM |

---

## 🔗 Vollständige Dokumentation
- `REACT-NATIVE-RULES-1.md` - Core Rendering, Lists, Animation
- `REACT-NATIVE-RULES-2.md` - Scroll, Navigation, State, Compiler, UI
- `REACT-NATIVE-RULES-3.md` - UI Patterns, Design System, Monorepo, JS, Fonts
