## Goal
Setup site colors with PrimeNG configuration

## Description
PrimeNG should be configured with black and white colors, similar to the shadcn library for React.

Example: button default colors should be black and white. Currently the Aura/Lara preset buttons are white.

## Tasks
- [ ] Plan and analyze this feature before implementation.
- [ ] Configure PrimeNG theme preset with black-and-white palette.
- [ ] Verify all in-scope components match the target style.

## Questions

1. **Theme preset**: The app currently uses the `Lara` preset. Should we stay on Lara and override its tokens, switch to `Aura`, or build a fully custom preset from scratch?

2. **Color palette**: When you say "black and white like shadcn" — do you mean:
   - (a) Pure `#000000` / `#ffffff` only, or
   - (b) Neutral gray scale (e.g. shadcn uses `zinc`: `#09090b` near-black, `#fafafa` near-white, with mid-grays for borders/muted text)?

3. **Dark mode**: Should dark mode be supported (light/dark toggle), or is this light-only for now?

4. **Component scope**: Which PrimeNG components are in scope? (e.g. Button, InputText, Card, Menu, Dialog — or all components site-wide?)

5. **Primary / accent color**: shadcn has a configurable "primary" that defaults to black. Should our primary action color (e.g. filled button background) be pure black, or is there a brand accent color to use instead?

6. **Background color**: The current global background is `#f8f9fa` (light gray). Should it stay, go pure `#ffffff`, or change to something else?

## Answers

1. No default requirement to make button black cuz currently its green make it as same as primeng defualt themeing which is black and white.

2. keeps the modern coloring not like default #0000 and #fffff

4. shadcn support and our project will support it but as of now change colors.

5. make it default to black and after I review it will deside.

6. lets stick with gray backgroud as of now

