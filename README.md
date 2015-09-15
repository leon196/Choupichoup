# Choupichoup
##[PLAY] on itch.io
##PLAY [Fullscreen]
![poster][poster]
## About
Choupichoup is a game about **learning**, **sharing** and **loving**.

You can learn symbols by getting close to them, and reveal the color of ideas.  
Once you learned enough, you will share together all the thoughts.  
Symbols generation is procedural and random. There is no meanings behind any combinations of symbols.

The project was originally started with [Ludum Dare] #33 (theme : You are the monster)  
But it was not finished on time ([my submission for Ludum Dare #33])  
This is a very special version made with love for [Oujevipo Contest #2]

## Credits
### Audio
**Music** is from **Jassummisko**, it's called [Temping]  
Thanks **Ben** for the sound of children laughs

### Frameworks
Canvas/WebGL : [Pixi.js]  
Audio : [howler.js]  
Dependencies : [require.js]  
Loading json : [jQuery.js]


### Code and illustrations
by [Leon]  
The paper texture in the background is from [CG Textures]


# Game Dev Story

## The beginning

The first idea for a game concept was a system of floating entities.  
Entities was following a bigger entity with a concept, a moral symbol or a social subject.  
I've remembered a class by **Alain Lioret** about the IA behavior called boids or flocking,  
and I really wanted to develop further this algorithm : [boids pseudocode]

![Original idea][Original idea]

## Ludum Dare Warmup Weekend

![Ludum Dare logo][Ludum Dare logo]

Later, the [Ludum Dare] #33 was starting soon, the [warmup weekend] was open.  
I decided to code early on the boids engine, so I could have time to make more illustrations  
I finally made a boids prototype that could display a message and had collisions  
([boids prototype]) ([demo video]) ([prototype source])

![boids engine prototype][boids engine prototype]  

A debug view to see what is happening behind the bubbles :

![boids debug view][boids debug view]

## Ludum Dare #33

Then ! The game jam start and I'm starting to have a new idea :  
Like in horizontal scroller, you control the character's thoughts, and have to avoid rectangular signs.  
The game would take place in a subway for example, and the signs would be oppressive ads like the movie *They Live*.  
You would had to collect letter on the road to discover a message a the end of the level.

![Another idea][Another idea]

After failing at rewriting a rectangular collision system (something already done in the past!)  
I focused on the actual game mechanic and was inspired by [Osmos]  
Big bubbles can absorb little ones. Absorbing make the bubble grows and splits when large enough.  

![gifs prototype divisions][gifs prototype divisions]

I've quickly saw that the rhythm and the speed of the boids did not fit.  
And there was no real balance of anything so the bubbles was multiplying themselves indefinitely.  
So no more growing and shrinking, just absorption and resorption.  

Bubble Leaking :  
![another gif prototype][another gif prototype]

The theme of [Ludum Dare] #33 was **You are the monster**,  
so I've tried something with sad and depressing thoughts.  

![Crumb][Crumb]

I've tried an aesthetic of black and white with inspirations like  
Idées Noires of **Franquin** or the drawings of **Robert Crumb**.  

![Franquin][Franquin]

But I was in vacation at the country-side, then the time runs out like wooow!  
And the 72 hours of game jam was over. ([my submission for Ludum Dare #33])  
So I accepted to not finish it, because the real thing was the [Oujevipo Contest #2].  

## Ludum Dare Post Jam

The jam version, the project sent before the dead-line was far away from being finished.  
I've reboot the project and optimize performance.  
It was time to do research and development again !  
Tweaking boids rules and balance of power to get a satisfying behavior.

![LDJam version gif 1][LDJam version gif 1]

Changing letters to symbols :  
![PostJam version gif 1][PostJam version gif 1]

Add some colors :  
![PostJam version gif 3][PostJam version gif 3]

I've even made a menu :  
![PostJam menu gif][PostJam menu gif]

But hey ! It's time to actually do a **game** !  
With a goal, levels, scores, sounds, musics and all the rest.

## The [Oujevipo Contest #2]

#### About
> The Oujevipo Contest #2 is a game jam organized by [Pierre Corbinais] and [Xavier Girard].  
It succeeds the [No Future Contest] which took place in 2013 and whom games were exhibited during the [Retro (no) Future Festival] in Cergy (France)  

> For this edition, the 10 best games will be exhibited on **custom made arcade cabinets** in various locations, starting with La Minoterie in Dijon (France), and the very best (according to the jury) will earn a 800€ cash prize.  

> The theme of this edition is **KIDS** (6-13 years old)

#### Constraints
From the many constraints, I've first choose :  
>\#9 The Quiet Game: the game doesn't contains any text/voice (that includes title screen and instructions)  

And when it was time to make a game, I've made a toy :
>\#10 Calvinball: the players fix the rules of the game themselves

### From a toy to a game

So this great boids engine has to find some purpose !  
Since you can absorb and resorb thoughts, may be the game could be a puzzle where you have to manage thoughts of people ?

A character would appear and would think about ideas, those ideas have a certain color.  
When you absorb all the thoughts, you reveal the personality of the character,  
and you know what the character wants.  
So I've started a game logic based on distribution,  
It's about **learning** (absorption), **sharing** (giving) and **loving** (distribute what one wants)  

![Choupichoup screen 1][Choupichoup screen 1]

Also, when you try to absorb bigger thoughts than you, it won't work.  
But if your avatar got thoughts that follow him,
they will give the avatar more size to absorb bigger than him.  
It is about **the power of knowledge**, of **culture**.  

It was actually fun, challenging and the message of learning, sharing and loving was deeply connected to the game mechanics.
But the mechanic of giving and the balance of power was too subtle to explain without text (because of a chosen constraint) and making excellent level design, that makes you learn basics and shows progressions and variations is really hard and was too much work for the time left.

After seeing people playing the game without help and failing at understanding what to do, I've decided to let it as a toy !

### From a game to a toy

[Oujevipo Contest #2] is for the KIDS !  
It's already fun, why so complicate ?  
So time to reboot the project ! The last one I swear !  
The new game experience is easy and inspired by the satisfaction of absorbing like in [Katamari Damacy]

![Choupichoup gif 1][Choupichoup gif 1]

There is no more an entity that is waiting and wanting for something in particular.  
Just people appearing and thinking about stuffs.  
No levels, only characters. And when they all passed, a celebration screen appears.  
And then we restart to show everybody again.  
This will happen no matter what you do, so you can do whatever you want without pressure or a slowing down.  

There is still things that happen when you absorb all the thoughts of some one :  
you will **celebrate together by sharing colorful ideas**  

There will be the same celebration when you absorb a certain amount of knowledge.  
That threshold of maximum bubbles is because what you get is what you give. (and for the sake of the frame rate)  

## Illustration

So ! The code is in a good shape and the game is fun.   Finally I can focus on the illustrations !  

Drawings are hand-made. I used a bic on a classic A4 paper.
Colors are made with [Gimp].  
I draw comics, I'm going to translate some of them, meanwhile if you read French here is [my fanzine]  

### Characters

![characters][characters]  

![drawings1][drawings1]

### Symbols  

![drawings2][drawings2]

![symbols][symbols]

### Animations

Toto :  
![character1][character1]  

Clyde :  
![clyde][clyde]  

## Thanks

- [Mike Kasprzak] and every ludum darers for [Ludum Dare] #33
- [Pierre Corbinais] and [Xavier Girard] and everybody involved in [Oujevipo Contest #2]
- [goodboy] and other contributors for [Pixi.js]  
- [Khronos] for [WebGL]  
- [GitHub] and everybody that contribute to open source  
- [CG Textures] for sharing great textures  
- **Jassummisko** for the music [Temping]  
- **Ben** for the sound of children laughs
- **Simon** for the playtests
- and **YOU** for reading, playing and dancing ![note][note]

![celebration][celebration]  

[Ludum Dare]: <http://ludumdare.com/compo/about-ludum-dare/>
[warmup weekend]: <http://ludumdare.com/compo/2015/08/13/warmup-weekend-for-ludum-dare-33/>
[PLAY]: <http://leon.itch.io/choupichoup>
[boids pseudocode]: <http://www.kfish.org/boids/pseudocode.html>
[boids prototype]: <http://leon196.github.io/Boids/>
[demo video]: <https://youtu.be/s-yLMrPfK4c>
[prototype source]: <https://github.com/leon196/Choupichoup/tree/fbe9272b0a22967af8b4b49a69038714329f8fa2>
[where I work]: <http://www.dvmobile.fr/>
[Osmos]: <http://www.osmos-game.com/>
[Katamari Damacy]: <https://www.youtube.com/watch?v=PVVW41iAu5A>
[my submission for Ludum Dare #33]: <http://ludumdare.com/compo/ludum-dare-33/?action=preview&uid=11872>
[my submission]: <http://leon.itch.io/choupichoup>
[Oujevipo]: <http://oujevipo.fr/>
[Oujevipo Contest #2]: <https://itch.io/jam/oujevipo-contest-2--kids>
[Gimp]:<http://www.gimp.org/>
[my fanzine]:<http://nocontrolstory.blogspot.fr/>
[goodboy]:<http://www.goodboydigital.com/>
[Pixi.js]:<http://www.pixijs.com/>
[Temping]:<http://www.newgrounds.com/audio/listen/637897>
[Leon]:<http://leon196.github.io/>
[Fullscreen]: <http://leon196.github.io/Choupichoup/>
[jQuery.js]: <https://jquery.com/>
[require.js]: <http://requirejs.org/>
[howler.js]: <https://github.com/goldfire/howler.js/>
[Pierre Corbinais]: <http://oujevipo.fr/>
[Xavier Girard]: <https://girxavier.wordpress.com/>
[No Future Contest]: <http://retronofuture.fr/?cat=3>
[Retro (no) Future Festival]: <http://oujevipo.fr/divers/1014-retro-no-future-games-festival-mon-compte-rendu/>
[Mike Kasprzak]: <https://twitter.com/mikekasprzak>
[Khronos]: <https://www.khronos.org/about>
[WebGL]:<https://github.com/KhronosGroup/WebGL>
[GitHub]:<https://github.com/>
[CG Textures]:<http://www.cgtextures.com/>

[boids engine prototype]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/letter.gif
[boids engine prototype 2]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/letter2.gif
[boids debug view]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/debugview.gif
[Ludum Dare logo]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/LDLogo2015.png
[Original Idea]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/originalIdea.jpg
[Another idea]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/scroller.jpg
[gifs prototype divisions]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/division.gif
[another gif prototype]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/6d.gif
[Franquin]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/idees_noires.gif (Franquin)
[Crumb]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/kafka15.jpg (Robert Crumb)
[Gotlib]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/Gotlib_Newton_Popart.jpg (Gotlib)
[LDJam version gif 1]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/10d.gif
[PostJam version gif 1]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/16c.gif
[PostJam version gif 2]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/13.gif
[PostJam version gif 3]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/17.gif
[PostJam menu gif]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/18b.gif
[PostJam menu debug gif]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/19.gif
[Choupichoup gif 1]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/choupichoup1.gif
[Choupichoup screen 1]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/screen1.PNG
[note]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/note.png
[poster]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/poster.png
[characters]: https://raw.githubusercontent.com/leon196/Choupichoup/master/sources/images/characters.png
[character1]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/character1.gif
[clyde]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/clyde.gif
[celebration]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/celebration.gif
[symbols]: https://raw.githubusercontent.com/leon196/Choupichoup/master/sources/images/symbolsB.png
[drawings1]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/drawings1.png
[drawings2]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/drawings2.png
