import { A11yModule } from "@angular/cdk/a11y";
import { OverlayModule } from "@angular/cdk/overlay";
import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";

import { PopoverTriggerForDirective } from "./popover-trigger-for.directive";
import { PopoverComponent } from "./popover.component";

export default {
  title: "Component Library/Popover",
  component: PopoverTriggerForDirective,
  decorators: [
    moduleMetadata({
      imports: [A11yModule, OverlayModule],
      declarations: [PopoverTriggerForDirective, PopoverComponent],
    }),
  ],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Zt3YSeb6E6lebAffrNLa0h/Tailwind-Component-Library?node-id=1717-15868",
    },
  },
} as Meta;

type Story = StoryObj<PopoverTriggerForDirective>;

export const TargetLeft: Story = {
  render: (args) => ({
    props: args,
    template: `
      <button
        type="button"
        class="tw-border-none tw-bg-transparent tw-text-primary-500"
        [bitPopoverTriggerFor]="myPopover"
      >
        <i class="bwi bwi-question-circle"></i>
      </button>

      <bit-popover #myPopover>
        <div>Lorem ipsum dolor <a href="#">adipisicing elit</a>.</div>
        <ul class="tw-mt-2 tw-mb-0 tw-pl-4">
          <li>Dolor sit amet consectetur</li>
          <li>Esse labore veniam tempora</li>
          <li>Adipisicing elit ipsum <a href="#">iustolaborum</a></li>
        </ul>
      </bit-popover>
      `,
  }),
};

export const TargetCenter: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="tw-flex tw-justify-center">
        <button
          type="button"
          class="tw-border-none tw-bg-transparent tw-text-primary-500"
          [bitPopoverTriggerFor]="myPopover"
        >
          <i class="bwi bwi-question-circle"></i>
        </button>
      </div>

      <bit-popover #myPopover>
        <div>Lorem ipsum dolor <a href="#">adipisicing elit</a>.</div>
        <ul class="tw-mt-2 tw-mb-0 tw-pl-4">
          <li>Dolor sit amet consectetur</li>
          <li>Esse labore veniam tempora</li>
          <li>Adipisicing elit ipsum <a href="#">iustolaborum</a></li>
        </ul>
      </bit-popover>
      `,
  }),
};

export const TargetRight: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="tw-flex tw-justify-end">
        <button
          type="button"
          class="tw-border-none tw-bg-transparent tw-text-primary-500"
          [bitPopoverTriggerFor]="myPopover"
        >
          <i class="bwi bwi-question-circle"></i>
        </button>
      </div>

      <bit-popover #myPopover>
        <div>Lorem ipsum dolor <a href="#">adipisicing elit</a>.</div>
        <ul class="tw-mt-2 tw-mb-0 tw-pl-4">
          <li>Dolor sit amet consectetur</li>
          <li>Esse labore veniam tempora</li>
          <li>Adipisicing elit ipsum <a href="#">iustolaborum</a></li>
        </ul>
      </bit-popover>
      `,
  }),
};

// export const OpenRight: Story = {
//   render: (args) => ({
//     props: args,
//     template: `
//       <bit-popover [header]="'Example Header'">
//         <div>Lorem ipsum dolor <a href="#">adipisicing elit</a>.</div>
//         <ul class="tw-mt-2 tw-mb-0 tw-pl-4">
//           <li>Dolor sit amet consectetur</li>
//           <li>Esse labore veniam tempora</li>
//           <li>Adipisicing elit. Ipsum <a href="#">iustolaborum</a></li>
//         </ul>
//       </bit-popover>
//       `,
//   }),
// };

// export const OpenLeft: Story = {
//   render: (args) => ({
//     props: args,
//     template: `
//       <div class="tw-flex tw-justify-end">
//         <bit-popover [header]="'Example Header'">
//           <div>Lorem ipsum dolor sit <a href="#">adipisicing elit</a>.</div>
//           <ul class="tw-mt-2 tw-mb-0 tw-pl-4">
//             <li>Dolor sit amet consectetur</li>
//             <li>Esse labore veniam tempora</li>
//             <li>Adipisicing elit ipsum <a href="#">iustolaborum</a></li>
//           </ul>
//         </bit-popover>
//       </div>
//       `,
//   }),
// };

// export const OpenBelow: Story = {
//   render: (args) => ({
//     props: args,
//     template: `
//       <div class="tw-flex tw-justify-center">
//         <bit-popover [header]="'Example Header'">
//           <div>Lorem ipsum dolor sit <a href="#">adipisicing elit</a>.</div>
//           <ul class="tw-mt-2 tw-mb-0 tw-pl-4">
//             <li>Dolor sit amet consectetur</li>
//             <li>Esse labore veniam tempora</li>
//             <li>Adipisicing elit ipsum <a href="#">iustolaborum</a></li>
//           </ul>
//         </bit-popover>
//       </div>
//       `,
//   }),
// };
