'use client';

import { cn } from '@/lib/utils/cn';
import { ArrowPathIcon } from '@heroicons/react/16/solid';
import { randomBytes } from 'crypto';
import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function GeneratePasswordInput({
  className,
  value,
  onChange,
  ...props
}: React.ComponentProps<'input'>) {
  const [password, setPassword] = React.useState(value);

  const onClick = () => {
    const length = 16;
    const pw = randomBytes(length)
      .toString('base64')
      .replace(/[^a-zA-Z0-9]/g, '') // Remove non-alphanumeric characters
      .slice(0, length);

    setPassword(pw);
    onChange?.({
      target: { value: pw },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  React.useEffect(() => {
    setPassword(value);
  }, [value]);

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <Input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          onChange?.(e);
        }}
        {...props}
        className={cn('grow')}
      />
      <Button
        variant={'outline'}
        type="button"
        className="h-9 shrink-0"
        onClick={onClick}
      >
        Generieren <ArrowPathIcon />
      </Button>
    </div>
  );
}
