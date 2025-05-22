import { ThemeSwitch } from '@/components/theme-switch';
import { ButtonGroup, ButtonGroupItem } from '@/components/ui/button-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArchiveBoxArrowDownIcon,
  CloudArrowUpIcon,
  DocumentArrowDownIcon,
  HomeIcon,
} from '@heroicons/react/16/solid';

export default function TestPage() {
  return (
    <main className="">
      <div className="px-32 py-72">
        <ThemeSwitch />
        <Tabs className="mt-12">
          <TabsList>
            <TabsTrigger value="1">
              <HomeIcon className="size-4" />
              Hello World
            </TabsTrigger>
            <TabsTrigger value="2">Hello World</TabsTrigger>
            <TabsTrigger value="3">Hello World</TabsTrigger>
          </TabsList>
          <TabsContent value="1">
            <div>Tab 1: Hello World</div>
          </TabsContent>
          <TabsContent value="2">
            <div>Tab 2: Hello Germany</div>
          </TabsContent>
          <TabsContent value="3">
            <div>Tab 3: Hello Australia</div>
          </TabsContent>
        </Tabs>
        <div className="mt-12">
          <Input placeholder="Hello World" className="w-72" />
        </div>
        <div className="mt-12">
          <Checkbox />
        </div>
        <div className="mt-12">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="cherry">Cherry</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Vegetables</SelectLabel>
                <SelectItem value="carrot">Carrot</SelectItem>
                <SelectItem value="potato">Potato</SelectItem>
                <SelectItem value="onion">Onion</SelectItem>
                <SelectItem value="tomato">Tomato</SelectItem>
                <SelectItem value="cucumber">Cucumber</SelectItem>
                <SelectItem value="lettuce">Lettuce</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-12">
          <ButtonGroup>
            <ButtonGroupItem>
              <ArchiveBoxArrowDownIcon /> Archivieren
            </ButtonGroupItem>
            <ButtonGroupItem>
              <DocumentArrowDownIcon /> Exportieren
            </ButtonGroupItem>
            <ButtonGroupItem>
              <CloudArrowUpIcon /> Importieren
            </ButtonGroupItem>
          </ButtonGroup>
        </div>
      </div>
    </main>
  );
}
