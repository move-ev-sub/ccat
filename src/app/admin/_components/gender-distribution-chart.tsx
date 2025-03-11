'use client';

import { Pie, PieChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
const chartData = [
  {
    gender: 'male',
    people: 627,
    fill: 'var(--color-male)',
  },
  {
    gender: 'female',
    people: 358,
    fill: 'var(--color-female)',
  },
  {
    gender: 'diverse',
    people: 93,
    fill: 'var(--color-diverse)',
  },
  {
    gender: 'nostatement',
    people: 22,
    fill: 'var(--color-nostatement)',
  },
];

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  male: {
    label: 'Male',
    color: 'hsl(var(--chart-1))',
  },
  female: {
    label: 'Female',
    color: 'hsl(var(--chart-2))',
  },
  diverse: {
    label: 'Diverse',
    color: 'hsl(var(--chart-3))',
  },
  nostatement: {
    label: 'Prefer not to say',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

export function GenderDistributionChart() {
  return (
    <Card className="flex h-fit flex-col">
      <CardHeader className="items-center">
        <CardTitle>Pie Chart - Donut</CardTitle>
        <p className="text-secondary mt-2 text-sm">January - June 2024</p>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartLegend content={<ChartLegendContent nameKey="gender" />} />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey="people"
              nameKey="gender"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
