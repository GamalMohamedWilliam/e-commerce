'use client';

import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { registerSchema } from '@/schema/register.schema';
import type { z } from 'zod';
import { useRouter } from 'next/navigation';

type RegisterValues = z.infer<typeof registerSchema>;

/** شكل محتمل لردّ الخطأ من الـ API */
type APIFieldError = { path?: keyof RegisterValues; msg?: string; message?: string };
type APIErrorPayload = {
  message?: string;
  msg?: string;
  error?: string;
  param?: keyof RegisterValues;
  errors?: APIFieldError[];
} | null;

function isAPIErrorPayload(x: unknown): x is Exclude<APIErrorPayload, null> {
  return !!x && typeof x === 'object';
}

function RegisterInner() {
  const router = useRouter();

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
    },
  });

  const { isSubmitting, errors } = form.formState;

  async function onSubmit(values: RegisterValues) {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const raw = (await res.json().catch(() => null)) as unknown;

        let msg = 'Registration failed';
        let targetField: keyof RegisterValues | undefined;

        if (isAPIErrorPayload(raw)) {
          msg = raw.message || raw.msg || raw.error || msg;
          const fieldFromParam = raw.param;
          const fieldFromErrors = Array.isArray(raw.errors) ? raw.errors[0]?.path : undefined;
          targetField = fieldFromParam || fieldFromErrors;
        }

        if (targetField && targetField in form.getValues()) {
          form.setError(targetField, { message: msg });
        } else {
          form.setError('root', { message: msg });
        }
        return;
      }

      router.push('/auth/login');
      router.refresh();
    } catch {
      form.setError('root', { message: 'Network error. Try again.' });
    }
  }

  return (
    <>
      <h2 className="my-5">Register Now:</h2>

      <Form {...form}>
        <form suppressHydrationWarning onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-2/3 mx-auto">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <div suppressHydrationWarning>
                    <Input {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div suppressHydrationWarning>
                    <Input type="email" autoComplete="email" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div suppressHydrationWarning>
                    <Input type="password" autoComplete="new-password" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <div suppressHydrationWarning>
                    <Input type="tel" autoComplete="tel" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {errors.root?.message && <p className="text-sm text-red-600">{errors.root.message}</p>}

          <div suppressHydrationWarning>
            <Button className="bg-main hover:bg-main" type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
              {isSubmitting ? 'Registering…' : 'Register'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

/** إلغاء SSR للصفحة كلها */
export default dynamic(() => Promise.resolve(RegisterInner), { ssr: false });
