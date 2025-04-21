'use client';

import {
  BackButton,
  NextButton,
} from '@/components/application/application-navigation';
import { useApplicationContext } from '@/components/application/application.context';
import { useStepContext } from '@/components/application/step';
import {
  Form,
  FormControl,
  FormDescription,
  FormError,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { inputVariants } from '@/components/ui/input/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Degree, Gender } from '@prisma/client';
import { format } from 'date-fns';
import React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { z } from 'zod';
import { DatePicker } from '../birth-date-picker-new';
import { translateDegree, translateGender } from './utils';

/**
 * Not really a clean solution, but it works for now
 *
 * @todo TODO: Find a better solution for managing the decimal schema
 *
 * @see https://github.com/colinhacks/zod/discussions/3339#discussioncomment-8859717
 */
const gradeSchema = z
  .string({
    required_error: 'Dieses Feld ist erforderlich',
    invalid_type_error: 'Bitte gebe eine gültige Zahl ein',
  })
  .transform((val) => Number(`${val}`.replace(',', '.')))
  .pipe(
    z
      .number()
      .min(1, 'Note muss zwischen 1,0 und 6,0 liegen')
      .max(6, 'Note muss zwischen 1,0 und 6,0 liegen')
  )
  .or(
    z
      .number()
      .min(1, 'Note muss zwischen 1,0 und 6,0 liegen')
      .max(6, 'Note muss zwischen 1,0 und 6,0 liegen')
  );

export const generalFormSchema = z.object({
  // ================== Personal Information ==================
  firstName: z.string().min(1, 'Dieses Feld ist erforderlich'),
  lastName: z.string().min(1, 'Dieses Feld ist erforderlich'),
  birthDate: z.date(),
  gender: z.nativeEnum(Gender, {
    message: 'Dieses Feld ist erforderlich',
  }),

  // ================== Academic Information ==================
  university: z.string().min(1, 'Dieses Feld ist erforderlich'),
  currentDegree: z.nativeEnum(Degree, {
    message: 'Dieses Feld ist erforderlich',
  }),
  targetDegree: z.enum([Degree.BACHELOR, Degree.MASTER], {
    message: 'Dieses Feld ist erforderlich',
  }),
  expectedGraduationYear: z.number().min(1, 'Dieses Feld ist erforderlich'),
  fieldOfStudy: z.string().min(1, 'Dieses Feld ist erforderlich'),
  semester: z
    .number({
      required_error: 'Dieses Feld ist erforderlich',
      invalid_type_error: 'Bitte gebe eine gültige Semesterzahl ein',
    })
    .min(1, 'Bitte gebe eine gültige Semesterzahl ein'),
  currentGpa: gradeSchema,
  abiturGrade: gradeSchema,
  experienceAbroad: z.number(),
  experienceConsulting: z.number(),
});

export function ApplicationGeneralForm() {
  const { data, setData } = useApplicationContext();
  const { nextStep } = useStepContext();
  const [error, setError] = React.useState<string | undefined>();

  const form = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      ...data.general,
    },
  });

  async function onSubmit(values: z.infer<typeof generalFormSchema>) {
    setError(undefined);
    setData({ ...data, general: values });
    nextStep();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <section
          id="personal-information"
          className="grid gap-8 md:grid-cols-4"
        >
          <div>
            <p className="text-foreground font-medium md:text-sm">
              Persönliche Angaben
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:col-span-3">
            <FirstNameField form={form} />
            <LastNameField form={form} />
            <GenderField form={form} />
            <BirthDateField form={form} />
          </div>
        </section>
        <Separator className="my-10" />
        <section
          id="academic-information"
          className="grid gap-8 md:grid-cols-4"
        >
          <div>
            <p className="text-foreground font-medium md:text-sm">
              Akademische Angaben
            </p>
          </div>
          <div className="grid gap-8 md:col-span-3 md:grid-cols-2 lg:grid-cols-3">
            <UniversityField
              form={form}
              className="md:col-span-2 lg:col-span-3"
            />
            <CurrentDegreeField form={form} />
            <TargetDegreeField form={form} />
            <ExpectedGraduationYearField form={form} />
            <FieldOfStudyField
              form={form}
              className="md:col-span-2 lg:col-span-3"
            />
            <SemesterField form={form} />
            <CurrentGpaField form={form} />
            <AbiturGradeField form={form} />
            <ExperienceAbroadField form={form} />
            <ExperienceConsultingField form={form} />
          </div>
        </section>
        <nav className="flex items-center justify-between">
          <BackButton />
          <NextButton type="submit">Weiter</NextButton>
        </nav>
        <FormError visible={!!error} message={error} />
      </form>
    </Form>
  );
}

// =========================== FIELDS ===========================

interface FieldProps {
  form: UseFormReturn<z.infer<typeof generalFormSchema>>;
  className?: string;
}

// #region First Name
// ===============================================================
function FirstNameField({ form, className }: FieldProps) {
  return (
    <FormField
      control={form.control}
      name="firstName"
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>Vorname</FormLabel>
          <FormControl>
            <Input
              placeholder="Peter"
              {...field}
              aria-label="Vorname"
              type="text"
              autoComplete="name"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// #region Last Name
// ===============================================================
function LastNameField({ form, className }: FieldProps) {
  return (
    <FormField
      control={form.control}
      name="lastName"
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>Nachname</FormLabel>
          <FormControl>
            <Input
              placeholder="Kajüter"
              {...field}
              aria-label="Nachname"
              type="text"
              autoComplete="family-name"
              aria-required
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// #region Gender
// ===============================================================
function GenderField({ form, className }: FieldProps) {
  return (
    <FormField
      control={form.control}
      name="gender"
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>Geschlecht</FormLabel>
          <Select
            onValueChange={(val) => {
              console.log(val);
              field.onChange(val as Gender);
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger aria-label="Geschlecht" aria-required>
                <SelectValue placeholder="Wähle eine Option aus" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.values(Gender).map((item) => (
                <SelectItem key={item} value={item.toString()}>
                  <span>{translateGender(item)}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// #region Birth Date
// ===============================================================
function BirthDateField({ form, className }: FieldProps) {
  return (
    <FormField
      control={form.control}
      name="birthDate"
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>Geburtsdatum</FormLabel>
          <FormControl>
            <DatePicker
              toDate={new Date()}
              value={field.value}
              onChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// #region University
// ===============================================================
function UniversityField({ form, className }: FieldProps) {
  return (
    <FormField
      control={form.control}
      name="university"
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>Universität</FormLabel>
          <FormControl>
            <Input placeholder="Universität Münster" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// #region Current Degree
// ===============================================================
function CurrentDegreeField({ form, className }: FieldProps) {
  return (
    <FormField
      control={form.control}
      name="currentDegree"
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>Aktueller Abschluss</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select degree" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.values(Degree).map((item) => (
                <SelectItem key={item} value={item}>
                  <span>{translateDegree(item)}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// #region Target Degree
// ===============================================================
function TargetDegreeField({ form, className }: FieldProps) {
  return (
    <FormField
      control={form.control}
      name="targetDegree"
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>Angestrebter Abschluss</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select degree" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {[Degree.BACHELOR, Degree.MASTER].map((item) => (
                <SelectItem key={item} value={item}>
                  <span>{translateDegree(item)}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// #region Expected Graduation Year
// ===============================================================
function ExpectedGraduationYearField({ form, className }: FieldProps) {
  const years = Array.from(
    { length: 20 },
    (_, i) => parseInt(format(new Date(), 'yyyy')) + i
  );

  return (
    <FormField
      control={form.control}
      name="expectedGraduationYear"
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>Erwartetes Abschlussjahr</FormLabel>
          <Select
            onValueChange={(value) => field.onChange(parseInt(value))}
            defaultValue={field.value.toString()}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// #region Field of Study
// ===============================================================
function FieldOfStudyField({ form, className }: FieldProps) {
  return (
    <FormField
      control={form.control}
      name="fieldOfStudy"
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>Studiengang</FormLabel>
          <FormControl>
            <Input placeholder="Betriebswirtschaftslehre" {...field} />
          </FormControl>
          <FormDescription>
            z.B. Betriebswirtschaftslehre, Wirtschaftsinformatik, etc.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// #region Semester
// ===============================================================
function SemesterField({ form, className }: FieldProps) {
  return (
    <FormField
      control={form.control}
      name="semester"
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>Aktuelles Semester</FormLabel>
          <FormControl>
            <NumericFormat
              allowNegative={false}
              decimalScale={0}
              fixedDecimalScale
              min={0}
              className={cn(inputVariants())}
              inputMode="numeric"
              {...field}
              value={field.value}
              onChange={(e) => field.onChange(parseInt(e.target.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// #region Current GPA
// ===============================================================
function CurrentGpaField({ form, className }: FieldProps) {
  return (
    <FormField
      control={form.control}
      name="currentGpa"
      render={({ field }) => (
        <FormItem className={cn('h-fit', className)}>
          <FormLabel>Aktueller Notendurchschnitt</FormLabel>
          <FormControl>
            <NumericFormat
              allowNegative={false}
              decimalSeparator=","
              allowedDecimalSeparators={['.', ',']}
              decimalScale={1}
              fixedDecimalScale
              min={1.0}
              max={6.0}
              className={cn(inputVariants())}
              inputMode="decimal"
              {...field}
              value={field.value.toString()}
              onChange={(e) => field.onChange(e.target.value)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// #region Abitur Grade
// ===============================================================
function AbiturGradeField({ form, className }: FieldProps) {
  return (
    <FormField
      control={form.control}
      name="abiturGrade"
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>Abitur Note</FormLabel>
          <FormControl>
            <NumericFormat
              allowNegative={false}
              decimalSeparator=","
              allowedDecimalSeparators={['.', ',']}
              decimalScale={1}
              fixedDecimalScale
              min={1.0}
              max={6.0}
              className={cn(inputVariants())}
              inputMode="decimal"
              {...field}
              value={field.value.toString()}
              onChange={(e) => field.onChange(e.target.value)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// #region Experience Abroad
// ===============================================================
function ExperienceAbroadField({ form, className }: FieldProps) {
  return (
    <FormField
      control={form.control}
      name="experienceAbroad"
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>Erfahrung im Ausland</FormLabel>
          <FormControl>
            <NumericFormat
              allowNegative={false}
              decimalScale={0}
              fixedDecimalScale
              min={0}
              className={cn(inputVariants())}
              inputMode="numeric"
              {...field}
              value={field.value}
              onChange={(e) => field.onChange(parseInt(e.target.value))}
            />
          </FormControl>
          <FormDescription>In Monaten</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// #region Experience Consulting
// ===============================================================
function ExperienceConsultingField({ form, className }: FieldProps) {
  return (
    <FormField
      control={form.control}
      name="experienceConsulting"
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>Erfahrung in der Unternehmensberatung</FormLabel>
          <FormControl>
            <NumericFormat
              allowNegative={false}
              decimalScale={0}
              fixedDecimalScale
              min={0}
              className={cn(inputVariants())}
              inputMode="numeric"
              {...field}
              value={field.value}
              onChange={(e) => field.onChange(parseInt(e.target.value))}
            />
          </FormControl>
          <FormDescription>In Monaten</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
