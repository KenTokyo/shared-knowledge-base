'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { LuX as X, LuChevronLeft as ChevronLeft } from 'react-icons/lu';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MobileDialogProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {
  title?: React.ReactNode;
  parentTitle?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  className?: string;
  rightElement?: React.ReactNode;
  header?: React.ReactNode;
}

const MobileDialog: React.FC<MobileDialogProps> = ({
  title,
  parentTitle,
  showBackButton,
  onBack,
  children,
  className,
  rightElement,
  header,
  ...props
}) => (
  <DialogPrimitive.Root {...props}>
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogPrimitive.Content
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-bottom-[2%] data-[state=open]:slide-in-from-bottom-[2%] overflow-hidden",
          className
        )}
      >
        {/* Header */}
        {header ? (
          header
        ) : (
          <div className="flex items-center justify-between border-b border-primary/10 px-4 py-3 bg-gradient-to-b from-background to-background/90 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              {showBackButton && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onBack}
                  className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              )}
              <div>
                {parentTitle && (
                  <p className="text-xs text-muted-foreground">{parentTitle}</p>
                )}
                <h2 className="text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light">{title}</h2>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {rightElement}
              <DialogPrimitive.Close className="h-8 w-8 rounded-full flex items-center justify-center opacity-70 ring-offset-background transition-opacity hover:opacity-100 hover:bg-primary/10 hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            </div>
          </div>
        )}

        {/* Content */}
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
);

const MobileDialogContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-y-auto pb-28 overscroll-contain", className)}
    {...props}
  />
));
MobileDialogContent.displayName = 'MobileDialogContent';

const MobileDialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("border-t border-primary/10 p-4 backdrop-blur-sm sticky bottom-0 z-20 bg-background/95 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]", className)}
    {...props}
  />
));
MobileDialogFooter.displayName = 'MobileDialogFooter';

export { MobileDialog, MobileDialogContent, MobileDialogFooter };