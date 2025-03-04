'use client';

import { cn } from '@/utils';
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/16/solid';
import { useTheme } from 'next-themes';
import React from 'react';

/**
 * The theme switch component allows the user to switch between different
 * themes. This component is only rendered client-side and requires the
 * `ThemeProvider` to be present in the component tree. It uses `next-themes`
 * under the hood to switch and select the theme.
 *
 * The ThemeSwitch component only serves as a container for the theme switch
 * buttons. The actual theme switching logic is handled by the `ThemeSwitchButton`
 * component.
 *
 * Possible themes are:
 * - `dark`
 * - `light`
 * - `system` (default, follows the system theme)
 */
export function ThemeSwitch({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [mounted, setMounted] = React.useState(false);

  /**
   * We can only render the theme switcher once the component is mounted
   * because we need to access the theme context. Otherwise, we would get
   * a hydration mismatch error.
   */
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        'bg-background border-border-secondary flex h-fit w-fit items-center justify-center rounded-full border p-1',
        className
      )}
      {...props}
    >
      <ThemeSwitchButton theme="dark">
        <MoonIcon />
      </ThemeSwitchButton>
      <ThemeSwitchButton theme="light">
        <SunIcon />
      </ThemeSwitchButton>
      <ThemeSwitchButton theme="system">
        <ComputerDesktopIcon />
      </ThemeSwitchButton>
    </div>
  );
}

type Theme = 'dark' | 'light' | 'system';

/**
 * The theme switch button component is a button that is rendered for each
 * theme in the `ThemeSwitch` component. When clicked, it will switch the
 * theme to the specified theme. When the theme is the current theme, the
 * button will be highlighted.
 */
function ThemeSwitchButton({
  className,
  theme,
  ...props
}: React.ComponentProps<'button'> & {
  /**
   * The theme that this button will switch to when clicked.
   */
  theme: Theme;
}) {
  const { theme: currentTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme)}
      className={cn(
        // base styles
        'text-foreground h-fit w-fit shrink-0 rounded-full p-1 [&_svg]:size-4',
        // highlight the button if the theme is the current theme
        theme === currentTheme && 'bg-foreground text-background',
        // focus styles
        'focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        className
      )}
      {...props}
    />
  );
}
