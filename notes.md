# 9/14/24 GitHub assignment
- It's easiest to just use the GitHub lens in VS Code, since it lets you compare both versions. 
- Github README files use markdown in their formatting—just like discord!
- make sure you pull before starting to make changes, otherwise you won't be working with the most up-to-date version.
- Make sure you push frequently, so you don't worry so much about losing your work.

# 9/24/24 HTML
- Images are added with img src="" with no closing tag
- links are added with a href="" /a
- DON'T forget the closing brackets
- h1, h2, h3, h4 are similar to the hastags in markdown
- span lets you adjust individual text without adding stuff
- p is a paragraph
- header/footer

# 10/3/24 CSS
## animations
Animations are done using @keyframes animationname{}. You set where it should be at 0% and then 100%, and tell it to transform (2d or 3d). You can also add where it should be in the middle if you want the animation to be particularly complicated.
**Other things to note:**
 - animation duration
 - animation delay
 - ease-in/ease-out/ other effects that you can google

## Spacing
There are a number of different units used to space things out:
 - Pixels (px): these are static. They do not change regardless of the size of the screen or font.
 - Em (as in element): these are relative. They change based on the size of the font of whatever the nearest element with a defined font size is. These are particularly useful for padding and margins
    - 1 em is equal to the font size, 2 em is twice the font size, etc.
 - Rem (Root element): these are also relative, but to the HTMl font size, rather than the nearest.. If you change the root font size, the size of 1 Rem will also change. also good for padding and margins.
 - Percent(%): These are relative to the size of the parent container. Good for animations or having a box take up half the screen, and so on.
 - Vh and VW (viewpoint height and width): These are a percentage out of 100 of the viewpoint height and width, respectively. Different devices can interpret vh and vw differently, so be careful with these.
 - ch scales based on the width of the 0 character of the font. This is useful for setting maximum charachter widths/ settings.
