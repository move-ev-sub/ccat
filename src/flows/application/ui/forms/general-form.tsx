'use client';

import * as React from 'react';

import { DatePicker } from '@/components/birth-date-picker-new';
import { FileUpload } from '@/components/file-upload';
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
import { FILE_CONSTRAINTS } from '@/features/application/consts/file';
import {
  BackButton,
  ForwardButton,
  StepsNavigation,
} from '@/flows/_lib/steps/steps-navigation';
import { useStepsContext } from '@/flows/_lib/steps/steps.context';
import { FormSection } from '@/flows/_lib/ui/form-section';
import { Degree, Gender } from '@/generated/prisma/client';
import { cn } from '@/lib/utils/cn';
import { translateDegree, translateGender } from '@/lib/utils/translations';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useForm, UseFormReturn } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { z } from 'zod/v4';
import { useApplicationStore } from '../../stores/application.store';
import { generalSchema } from '../../validations/forms';

/**
 * Not really a clean solution, but it works for now
 *
 * @todo TODO: Find a better solution for managing the decimal schema
 *
 * @see https://github.com/colinhacks/zod/discussions/3339#discussioncomment-8859717
 */
// const gradeSchema = z
//   .string()
//   .transform((val) => Number(`${val}`.replace(',', '.')))
//   .pipe(
//     z
//       .number()
//       .min(1, 'Note muss zwischen 1,0 und 6,0 liegen')
//       .max(6, 'Note muss zwischen 1,0 und 6,0 liegen')
//   )
//   .or(
//     z
//       .number()
//       .min(1, 'Note muss zwischen 1,0 und 6,0 liegen')
//       .max(6, 'Note muss zwischen 1,0 und 6,0 liegen')
//   );

export function GeneralForm() {
  const { general, setGeneral } = useApplicationStore((state) => state);
  const [error, setError] = React.useState<string | undefined>();
  const { goForward } = useStepsContext();
  const form = useForm<z.infer<typeof generalSchema>>({
    resolver: zodResolver(generalSchema),
    defaultValues: {
      ...general,
      birthDate: new Date(general.birthDate) ?? new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof generalSchema>) {
    setError(undefined);
    setGeneral(values);

    goForward();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormSection id="personal-information" label="1. Persönliche Angaben">
          <FirstNameField form={form} className="xl:col-span-3" />
          <LastNameField form={form} className="xl:col-span-3" />
          <GenderField form={form} className="md:col-span-2 xl:col-span-3" />
          <BirthDateField form={form} className="md:col-span-2 xl:col-span-3" />
        </FormSection>

        <Separator className="my-20" />

        <FormSection id="academic-information" label="2. Akademische Angaben">
          <UniversityField
            form={form}
            className="md:col-span-2 xl:col-span-3"
          />
          <FieldOfStudyField
            form={form}
            className="md:col-span-2 xl:col-span-3"
          />
          <CurrentDegreeField form={form} className="xl:col-span-2" />
          <TargetDegreeField form={form} className="xl:col-span-2" />
          <ExpectedGraduationYearField form={form} className="xl:col-span-2" />
          <SemesterField form={form} className="xl:col-span-2" />
          <CurrentGpaField form={form} className="xl:col-span-2" />
          <AbiturGradeField form={form} className="xl:col-span-2" />
        </FormSection>

        <Separator className="my-20" />

        <FormSection
          id="professional-information"
          label="3. Berufliche Angaben"
        >
          <ExperienceAbroadField
            form={form}
            className="md:col-span-2 xl:col-span-3"
          />
          <ExperienceConsultingField
            form={form}
            className="md:col-span-2 xl:col-span-3"
          />
        </FormSection>

        <Separator className="my-20" />

        <FormSection id="documents" label="4. Dokumente">
          <FormField
            control={form.control}
            name="cv"
            render={({ field }) => (
              <div className="space-y-6 md:col-span-2 xl:col-span-6">
                <FormItem className="w-full space-y-2">
                  <FormLabel>Lebenslauf</FormLabel>
                  <FormControl>
                    <FileUpload
                      value={field.value}
                      onValueChange={field.onChange}
                      accept={FILE_CONSTRAINTS.ACCEPTED_FILE_TYPES}
                      maxFileCount={FILE_CONSTRAINTS.MAX_FILE_COUNT}
                      maxSize={FILE_CONSTRAINTS.MAX_FILE_SIZE}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
        </FormSection>
        <FormError visible={!!error} message={error} />
        <Separator className="my-12" />
        <StepsNavigation>
          <BackButton />
          <ForwardButton type="submit" onClick={() => {}} />
        </StepsNavigation>
      </form>
    </Form>
  );
}

// =========================== FIELDS ===========================

interface FieldProps {
  form: UseFormReturn<z.infer<typeof generalSchema>>;
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
            <Input
              placeholder="Universität Münster"
              {...field}
              aria-label="Universität"
              type="text"
              autoComplete="university"
              aria-required
            />
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
