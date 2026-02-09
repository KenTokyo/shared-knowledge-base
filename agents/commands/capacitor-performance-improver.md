Performance Optimization
CRITICAL: Lazy Load Plugins
CORRECT - Dynamic imports:

// Only load when needed
async function scanDocument() {
  const { DocumentScanner } = await import('@capgo/capacitor-document-scanner');
  return DocumentScanner.scanDocument();
}
INCORRECT - Import everything at startup:

// Increases initial bundle size
import { DocumentScanner } from '@capgo/capacitor-document-scanner';
import { NativeBiometric } from '@capgo/capacitor-native-biometric';
import { Camera } from '@capacitor/camera';
// ... 20 more plugins
HIGH: Optimize WebView Performance
CORRECT - Use hardware acceleration:

<!-- android/app/src/main/AndroidManifest.xml -->
<application
    android:hardwareAccelerated="true"
    android:largeHeap="true">
<!-- ios/App/App/Info.plist -->
<key>UIViewGroupOpacity</key>
<false/>
HIGH: Minimize Bridge Calls
CORRECT - Batch operations:

// Single call with batch data
await Storage.set({
  key: 'userData',
  value: JSON.stringify({ name, email, preferences }),
});
INCORRECT - Multiple bridge calls:

// Each call crosses the JS-native bridge
await Storage.set({ key: 'name', value: name });
await Storage.set({ key: 'email', value: email });
await Storage.set({ key: 'preferences', value: JSON.stringify(preferences) });
MEDIUM: Image Optimization
CORRECT:

import { Camera, CameraResultType } from '@capacitor/camera';

const photo = await Camera.getPhoto({
  quality: 80,           // Not 100
  width: 1024,           // Reasonable max
  resultType: CameraResultType.Uri,  // Not Base64 for large images
  correctOrientation: true,
});
INCORRECT:

const photo = await Camera.getPhoto({
  quality: 100,
  resultType: CameraResultType.Base64,  // Memory intensive
  // No size limits
});

Schau mal ob 