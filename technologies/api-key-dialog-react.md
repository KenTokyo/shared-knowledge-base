"use client";

import { useState, useCallback, useEffect } from "react";
import {
  useApiKey,
  AIProvider,
  PROVIDER_CONFIGS,
} from "@/contexts/ApiKeyContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ExternalLink,
  Key,
  Shield,
  Zap,
  GripVertical,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Drag and Drop Provider Order Component
function ProviderOrderManager() {
  const { providerOrder, setProviderOrder, isProviderKeySet } = useApiKey();
  const [draggedItem, setDraggedItem] = useState<AIProvider | null>(null);

  const handleDragStart = (e: React.DragEvent, provider: AIProvider) => {
    setDraggedItem(provider);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetProvider: AIProvider) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetProvider) return;

    const newOrder = [...providerOrder];
    const draggedIndex = newOrder.indexOf(draggedItem);
    const targetIndex = newOrder.indexOf(targetProvider);

    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedItem);

    setProviderOrder(newOrder);
    setDraggedItem(null);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <GripVertical className="h-4 w-4" />
          Provider-Reihenfolge
        </CardTitle>
        <CardDescription className="text-xs">
          Ziehe die Provider, um die Fallback-Reihenfolge festzulegen. Wenn ein
          Provider sein Limit erreicht, wird automatisch der nächste verwendet.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {providerOrder.map((provider, index) => {
          const config = PROVIDER_CONFIGS[provider];
          const hasKey = isProviderKeySet(provider);

          return (
            <div
              key={provider}
              draggable
              onDragStart={(e) => handleDragStart(e, provider)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, provider)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border cursor-move transition-all",
                "hover:bg-muted/50",
                draggedItem === provider && "opacity-50",
                hasKey ? "border-green-200 bg-green-50/50" : "border-muted"
              )}
            >
              <GripVertical className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">
                    {index + 1}. {config.name}
                  </span>
                  {hasKey ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {config.description}
                </p>
              </div>
              <Badge
                variant={hasKey ? "default" : "secondary"}
                className="text-xs"
              >
                {hasKey ? "Konfiguriert" : "Nicht konfiguriert"}
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

// Provider Setup Instructions Component
function ProviderInstructions({ provider }: { provider: AIProvider }) {
  const config = PROVIDER_CONFIGS[provider];

  if (provider === "gemini") {
    return (
      <div className="space-y-6">
        {/* Spezifische Gemini Modelle */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="p-2 sm:p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800 text-center">
            <div className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400">
              100
            </div>
            <div className="text-xs sm:text-xs text-green-700 dark:text-green-300">
              Gemini 2.5 Pro
            </div>
            <div className="text-xs text-muted-foreground">Anfragen/Tag</div>
          </div>
          <div className="p-2 sm:p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800 text-center">
            <div className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400">
              200
            </div>
            <div className="text-xs sm:text-xs text-green-700 dark:text-green-300">
              Gemini 2.5 Flash
            </div>
            <div className="text-xs text-muted-foreground">Anfragen/Tag</div>
          </div>
          <div className="p-2 sm:p-3 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800 text-center">
            <div className="text-lg sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              1000
            </div>
            <div className="text-xs sm:text-xs text-emerald-700 dark:text-emerald-300">
              Gemini 2.0 Flash
            </div>
            <div className="text-xs text-muted-foreground">Anfragen/Tag</div>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-5">
          <h4 className="font-semibold text-sm sm:text-lg flex items-center gap-2 text-center justify-center">
            <Key className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            So erstellst du deinen kostenlosen API-Schlüssel:
          </h4>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex gap-2 sm:gap-4 p-2 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/60 dark:to-gray-800/40 rounded-lg border border-muted hover:border-primary/50 transition-colors">
              <div className="flex-shrink-0">
                <Badge className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-bold bg-gradient-to-r from-primary to-primary/80">
                  1
                </Badge>
              </div>
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                  Besuche{" "}
                  <a
                    href={config.setupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline font-semibold"
                  >
                    Google AI Studio <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                  </a>{" "}
                  und melde dich mit deinem Google-Konto an.
                </p>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-4 p-2 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/60 dark:to-gray-800/40 rounded-lg border border-muted hover:border-primary/50 transition-colors">
              <div className="flex-shrink-0">
                <Badge className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-bold bg-gradient-to-r from-primary to-primary/80">
                  2
                </Badge>
              </div>
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                  Klicke auf <strong>"Get API Key"</strong> in der linken
                  Seitenleiste.
                </p>
                <img
                  src="/AI_KEY_ERHALTEN-2.png"
                  alt="Get API Key Button"
                  className="w-full max-w-xs sm:max-w-md rounded-lg border border-muted shadow-sm"
                />
              </div>
            </div>

            <div className="flex gap-2 sm:gap-4 p-2 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/60 dark:to-gray-800/40 rounded-lg border border-muted hover:border-primary/50 transition-colors">
              <div className="flex-shrink-0">
                <Badge className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-bold bg-gradient-to-r from-primary to-primary/80">
                  3
                </Badge>
              </div>
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                  Klicke auf <strong>"Create API key"</strong> und wähle ein
                  Google Cloud Projekt aus (oder erstelle ein neues).
                </p>
                <img
                  src="/AI_KEY_ERHALTEN-3.png"
                  alt="Create API key Dialog"
                  className="w-full max-w-xs sm:max-w-md rounded-lg border border-muted shadow-sm"
                />
              </div>
            </div>

            <div className="flex gap-2 sm:gap-4 p-2 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/60 dark:to-gray-800/40 rounded-lg border border-muted hover:border-primary/50 transition-colors">
              <div className="flex-shrink-0">
                <Badge className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-bold bg-gradient-to-r from-orange-500 to-orange-600">
                  4
                </Badge>
              </div>
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium mb-2 sm:mb-3">
                  <strong>Wichtig:</strong> Überprüfe, dass dein Projekt auf den{" "}
                  <strong>kostenlosen Tarif</strong> eingestellt ist.
                </p>
                <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-l-4 border-orange-400 dark:border-orange-600 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-orange-800 dark:text-orange-200">
                      <p className="font-semibold mb-1">
                        💡 Tipp für 100% kostenlosen Betrieb:
                      </p>
                      <p>
                        Diesen Ausschnitt findest du ganz unten auf der Seite{" "}
                        <a
                          href="https://aistudio.google.com/app"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-700 dark:text-orange-300 underline hover:text-orange-900 dark:hover:text-orange-100"
                        >
                          https://aistudio.google.com/apikey
                        </a>{" "}
                        - scrolle nach unten und stelle sicher, dass dort{" "}
                        <strong>"Tarif: free"</strong> steht.
                      </p>
                    </div>
                  </div>
                </div>
                <img
                  src="/AI_KEY_ERHALTEN-4.png"
                  alt="Projekt-Einstellungen"
                  className="w-full max-w-md rounded-lg border border-muted shadow-sm mt-3"
                />
              </div>
            </div>

            <div className="flex gap-2 sm:gap-4 p-2 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/60 dark:to-gray-800/40 rounded-lg border border-muted hover:border-primary/50 transition-colors">
              <div className="flex-shrink-0">
                <Badge className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-bold bg-gradient-to-r from-green-600 to-green-700">
                  5
                </Badge>
              </div>
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                  Kopiere den generierten API-Schlüssel und füge ihn unten ein.
                </p>
                <img
                  src="/AI_KEY_ERHALTEN-5.png"
                  alt="API-Schlüssel kopieren"
                  className="w-full max-w-xs sm:max-w-md rounded-lg border border-muted shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (provider === "openrouter") {
    return (
      <div className="space-y-6">
        {/* OpenRouter Quota-Anzeige */}
        <div className="flex items-center justify-center gap-4 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
              200+
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300">
              Kostenlose Anfragen
            </div>
          </div>
          <div className="w-px h-12 bg-blue-300 dark:bg-blue-700"></div>
          <div className="text-sm text-blue-700 dark:text-blue-300">
            <div className="font-semibold">Verschiedene Modelle</div>
            <div>Vielfältige Auswahl</div>
          </div>
        </div>

        <div className="space-y-5">
          <h4 className="font-semibold text-lg flex items-center gap-2 text-center justify-center">
            <Key className="h-5 w-5 text-primary" />
            So erstellst du deinen OpenRouter API-Schlüssel:
          </h4>

          <div className="space-y-4">
            <div className="flex gap-2 sm:gap-4 p-2 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/60 dark:to-gray-800/40 rounded-lg border border-muted hover:border-primary/50 transition-colors">
              <div className="flex-shrink-0">
                <Badge className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-bold bg-gradient-to-r from-primary to-primary/80">
                  1
                </Badge>
              </div>
              <div className="flex-1">
                <p className="font-medium">
                  Besuche{" "}
                  <a
                    href={config.setupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline font-semibold"
                  >
                    OpenRouter Keys <ExternalLink className="h-4 w-4" />
                  </a>{" "}
                  und erstelle ein Konto.
                </p>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-4 p-2 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/60 dark:to-gray-800/40 rounded-lg border border-muted hover:border-primary/50 transition-colors">
              <div className="flex-shrink-0">
                <Badge className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-bold bg-gradient-to-r from-primary to-primary/80">
                  2
                </Badge>
              </div>
              <div className="flex-1">
                <p className="font-medium">
                  Klicke auf <strong>"Create Key"</strong> und gib einen Namen
                  für deinen Schlüssel ein.
                </p>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-4 p-2 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/60 dark:to-gray-800/40 rounded-lg border border-muted hover:border-primary/50 transition-colors">
              <div className="flex-shrink-0">
                <Badge className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-bold bg-gradient-to-r from-green-600 to-green-700">
                  3
                </Badge>
              </div>
              <div className="flex-1">
                <p className="font-medium">
                  Kopiere den generierten API-Schlüssel (beginnt mit
                  "sk-or-...") und füge ihn unten ein.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export function ApiKeyRequiredDialog() {
  const {
    isModalOpen,
    closeModal,
    currentProvider,
    setProviderApiKey,
    isProviderKeySet,
  } = useApiKey();

  const [localApiKey, setLocalApiKey] = useState("");
  const [selectedProvider, setSelectedProvider] =
    useState<AIProvider>("gemini");
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (currentProvider) {
      setSelectedProvider(currentProvider);
    }
  }, [currentProvider]);

  const validateApiKey = useCallback(
    (key: string, provider: AIProvider): string | null => {
      if (!key.trim()) return "API-Schlüssel darf nicht leer sein";

      const config = PROVIDER_CONFIGS[provider];
      if (provider === "gemini" && key.length < 38) {
        return `Dein Gemini API-Schlüssel scheint ungültig zu sein. Er sollte 39 Zeichen lang sein.`;
      }
      if (provider === "openrouter" && !key.startsWith("sk-or-")) {
        return `OpenRouter API-Schlüssel sollte mit "sk-or-" beginnen (Format: ${config.keyFormat})`;
      }

      return null;
    },
    []
  );

  const handleSave = useCallback(() => {
    const trimmedKey = localApiKey.trim();
    const error = validateApiKey(trimmedKey, selectedProvider);

    if (error) {
      setValidationError(error);
      return;
    }

    setProviderApiKey(selectedProvider, trimmedKey);
    setLocalApiKey("");
    setValidationError(null);
  }, [localApiKey, selectedProvider, validateApiKey, setProviderApiKey]);

  const handleKeyChange = useCallback(
    (value: string) => {
      setLocalApiKey(value);
      if (validationError) {
        setValidationError(null);
      }
    },
    [validationError]
  );

  const currentConfig = PROVIDER_CONFIGS[selectedProvider];

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="w-[98vw] max-w-md sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/60 dark:to-gray-800/40 -mx-6 px-6 pb-3 pt-3 rounded-t-lg text-center">
          <DialogTitle className="flex items-center justify-center gap-2 text-sm sm:text-xl">
            <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 leading-tight">
              Du hast noch keine KI API hinterlegt
            </span>
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-base mt-1">
            <span className="text-green-600 dark:text-green-400 font-semibold">
              Aber keine Sorge, das ist komplett kostenlos!
            </span>
            <br />
            <span className="text-muted-foreground">
              Google gewährt über 1000 Anfragen pro Tag kostenlos. Einfach 5
              Schritte befolgen:
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          <Tabs
            value={selectedProvider}
            onValueChange={(value) => setSelectedProvider(value as AIProvider)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6">
              <TabsTrigger
                value="gemini"
                className="flex items-center gap-1 sm:gap-2 py-2 sm:py-3 text-xs sm:text-sm"
              >
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                <span className="font-medium hidden sm:inline">Google Gemini</span>
                <span className="font-medium sm:hidden">Gemini</span>
                {isProviderKeySet("gemini") && (
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                )}
              </TabsTrigger>
              <TabsTrigger
                value="openrouter"
                className="flex items-center gap-1 sm:gap-2 py-2 sm:py-3 text-xs sm:text-sm"
              >
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-500" />
                <span className="font-medium">OpenRouter</span>
                {isProviderKeySet("openrouter") && (
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="gemini" className="space-y-3 sm:space-y-6">
              <ProviderInstructions provider="gemini" />
            </TabsContent>

            <TabsContent value="openrouter" className="space-y-3 sm:space-y-6">
              <ProviderInstructions provider="openrouter" />
            </TabsContent>
          </Tabs>

          {/* API Key Input Section */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/60 dark:to-gray-800/40 p-3 sm:p-6 rounded-xl border border-muted">
            <div className="space-y-3 sm:space-y-4">
              <div className="text-center">
                <h3 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2">
                  API-Schlüssel eingeben
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Füge deinen {currentConfig.name} API-Schlüssel ein (Format:{" "}
                  {currentConfig.keyFormat})
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="api-key" className="text-xs sm:text-sm font-medium">
                  Dein {currentConfig.name} API-Schlüssel
                </Label>
                <Input
                  id="api-key"
                  type="password"
                  value={localApiKey}
                  onChange={(e) => handleKeyChange(e.target.value)}
                  placeholder={`z.B. ${currentConfig.keyFormat}`}
                  className={cn(
                    "h-12 text-base",
                    validationError && "border-red-500 focus:border-red-500"
                  )}
                />
                {validationError && (
                  <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {validationError}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Security & Free Info */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 sm:p-6 rounded-xl border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-green-800 dark:text-green-200 text-base sm:text-lg">
                  🎉{" "}
                  <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400">
                    KOSTENLOS
                  </span>{" "}
                  & Sicher
                </h4>
                <div className="text-sm text-green-700 dark:text-green-300 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 font-bold">
                      ✓
                    </span>
                    <span>
                      <strong>100% kostenlos:</strong> Nutze großzügige
                      kostenlose Kontingente ohne versteckte Kosten
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 font-bold">
                      ✓
                    </span>
                    <span>
                      <strong>Maximale Sicherheit:</strong> Dein API-Schlüssel
                      wird nur lokal auf deinem Gerät gespeichert
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 font-bold">
                      ✓
                    </span>
                    <span>
                      <strong>Keine Übertragung:</strong> Wir senden deinen
                      Schlüssel niemals an unsere Server
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 font-bold">
                      ✓
                    </span>
                    <span>
                      <strong>Volle Kontrolle:</strong> Du kannst den Schlüssel
                      jederzeit löschen oder ändern
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ProviderOrderManager />
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="outline"
            onClick={closeModal}
            className="w-full sm:w-auto h-12"
          >
            Später konfigurieren
          </Button>
          <Button
            onClick={handleSave}
            disabled={!localApiKey.trim()}
            className="w-full sm:w-auto h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold"
          >
            <Key className="h-5 w-5 mr-2" />
            Schlüssel speichern & KI aktivieren
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
