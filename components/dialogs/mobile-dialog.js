'use client';
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileDialogFooter = exports.MobileDialogContent = exports.MobileDialog = void 0;
const React = __importStar(require("react"));
const DialogPrimitive = __importStar(require("@radix-ui/react-dialog"));
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils/utils");
const button_1 = require("@/components/ui/button");
const MobileDialog = ({ title, parentTitle, showBackButton, onBack, children, className, rightElement, header, ...props }) => (<DialogPrimitive.Root {...props}>
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"/>
      <DialogPrimitive.Content className={(0, utils_1.cn)("fixed inset-0 z-50 flex flex-col bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-bottom-[2%] data-[state=open]:slide-in-from-bottom-[2%] overflow-hidden", className)}>
        {/* Header */}
        {header ? (header) : (<div className="flex items-center justify-between border-b border-primary/10 px-4 py-3 bg-gradient-to-b from-background to-background/90 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              {showBackButton && (<button_1.Button variant="ghost" size="icon" onClick={onBack} className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary">
                  <lucide_react_1.ChevronLeft className="h-5 w-5"/>
                </button_1.Button>)}
              <div>
                {parentTitle && (<p className="text-xs text-muted-foreground">{parentTitle}</p>)}
                <h2 className="text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light">{title}</h2>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {rightElement}
              <DialogPrimitive.Close className="h-8 w-8 rounded-full flex items-center justify-center opacity-70 ring-offset-background transition-opacity hover:opacity-100 hover:bg-primary/10 hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
                <lucide_react_1.X className="h-4 w-4"/>
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            </div>
          </div>)}

        {/* Content */}
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>);
exports.MobileDialog = MobileDialog;
const MobileDialogContent = React.forwardRef(({ className, ...props }, ref) => (<div ref={ref} className={(0, utils_1.cn)("flex-1 overflow-y-auto pb-28 overscroll-contain", className)} {...props}/>));
exports.MobileDialogContent = MobileDialogContent;
MobileDialogContent.displayName = 'MobileDialogContent';
const MobileDialogFooter = React.forwardRef(({ className, ...props }, ref) => (<div ref={ref} className={(0, utils_1.cn)("border-t border-primary/10 p-4 backdrop-blur-sm sticky bottom-0 z-20 bg-background/95 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]", className)} {...props}/>));
exports.MobileDialogFooter = MobileDialogFooter;
MobileDialogFooter.displayName = 'MobileDialogFooter';
//# sourceMappingURL=mobile-dialog.js.map