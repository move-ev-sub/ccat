import { PageContainer } from '@/components/page-container';
import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardLink,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { PlusCircleIcon } from '@heroicons/react/16/solid';

/**
 * We use the sink page to catch display all ui components and their variants.
 * This page is only needed for development purposes and should not be used in production.
 *
 */
export default async function Sink() {
  return (
    <main>
      <PageContainer className="space-y-12">
        <PageHeader>
          <PageTitle>Hello World</PageTitle>
          <PageDesc>This is a description of the page.</PageDesc>
        </PageHeader>
        <Separator />
        {/* ------------------ BUTTONS ------------------ */}
        {/* ------------------ SMALL ------------------ */}
        <section
          id="buttons-sm"
          className="container grid grid-cols-4 gap-8 [&_*]:w-fit"
        >
          <Button size={'sm'}>
            Hello World <PlusCircleIcon />
          </Button>
          <Button variant={'accent'} size={'sm'}>
            Hello World <PlusCircleIcon />
          </Button>
          <Button variant={'destructive'} size={'sm'}>
            Hello World <PlusCircleIcon />
          </Button>
          <Button variant={'success'} size={'sm'}>
            Hello World <PlusCircleIcon />
          </Button>
          <Button variant={'warning'} size={'sm'}>
            Hello World <PlusCircleIcon />
          </Button>
          <Button variant={'ghost'} size={'sm'}>
            Hello World <PlusCircleIcon />
          </Button>
          <Button variant={'outline'} size={'sm'}>
            Hello World <PlusCircleIcon />
          </Button>
        </section>
        {/* ------------------ BASE ------------------ */}
        <section
          id="buttons-base"
          className="container grid grid-cols-4 gap-8 [&_*]:w-fit"
        >
          <Button>
            Hello World <PlusCircleIcon />
          </Button>
          <Button variant={'accent'}>
            Hello World <PlusCircleIcon />
          </Button>
          <Button variant={'destructive'}>
            Hello World <PlusCircleIcon />
          </Button>
          <Button variant={'success'}>
            Hello World <PlusCircleIcon />
          </Button>
          <Button variant={'warning'}>
            Hello World <PlusCircleIcon />
          </Button>
          <Button variant={'ghost'}>
            Hello World <PlusCircleIcon />
          </Button>
          <Button variant={'outline'}>
            Hello World <PlusCircleIcon />
          </Button>
        </section>
        {/* ------------------ LARGE ------------------ */}
        <section
          id="buttons-lg"
          className="container grid grid-cols-4 gap-8 [&_*]:w-fit"
        >
          <Button size={'lg'}>
            Hello World <PlusCircleIcon />
          </Button>
          <Button variant={'accent'} size={'lg'}>
            Hello World <PlusCircleIcon />
          </Button>
          <Button variant={'destructive'} size={'lg'}>
            Hello World <PlusCircleIcon />
          </Button>
          <Button variant={'success'} size={'lg'}>
            Hello World <PlusCircleIcon />
          </Button>
          <Button variant={'warning'} size={'lg'}>
            Hello World <PlusCircleIcon />
          </Button>
          <Button variant={'ghost'} size={'lg'}>
            Hello World <PlusCircleIcon />
          </Button>
          <Button variant={'outline'} size={'lg'}>
            Hello World <PlusCircleIcon />
          </Button>
        </section>
        <Separator />
        <section id="accordion" className="container">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It&apos;s animated by default, but you can disable it if
                you prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
        <Separator />
        <section id="alert-dialog" className="container">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>
        <Separator />
        <section id="avatar" className="container grid grid-cols-3 gap-8">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </section>
        <Separator />
        <section id="badge" className="container grid grid-cols-6 gap-8">
          <Badge>Badge</Badge>
          <Badge variant={'error'}>Badge</Badge>
          <Badge variant={'success'}>Badge</Badge>
          <Badge variant={'warn'}>Badge</Badge>
        </section>
        <Separator />
        <section id="card" className="container grid grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This is some content</p>
            </CardContent>
            <CardFooter>
              <CardLink href={'#'}>Card Link</CardLink>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This is some content</p>
            </CardContent>
            <CardFooter>
              <CardLink href={'#'}>Card Link</CardLink>
            </CardFooter>
          </Card>
        </section>
        <Separator />
        <section id="separator" className="container">
          <Separator />
        </section>
        <Separator />
        <section id="popover" className="container">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="leading-none font-medium">Dimensions</h4>
                  <p className="text-muted-foreground text-sm">
                    Set the dimensions for the layer.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Width</Label>
                    <Input
                      id="width"
                      defaultValue="100%"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxWidth">Max. width</Label>
                    <Input
                      id="maxWidth"
                      defaultValue="300px"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="height">Height</Label>
                    <Input
                      id="height"
                      defaultValue="25px"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxHeight">Max. height</Label>
                    <Input
                      id="maxHeight"
                      defaultValue="none"
                      className="col-span-2 h-8"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </section>
      </PageContainer>
    </main>
  );
}
