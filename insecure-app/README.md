# React Security Best Practices Workshop

The intention of this project is to show the potential vulnerabilities can be encountered on a React.js project.
The objective is to try to cover each vulnerability as much as possible, this means, to cover most layers possible.

Sorry for horribly looking page :(

[Presentation Link](https://docs.google.com/presentation/d/1u1hPA3o-AJzAq4wOKMSPQvxfj8Ur313tgRlQJfKZAp4/edit?usp=sharing)

## Project content

The project is based of:
 - React.JS project
 - ExpressJS, as external server (mocking the attacker server to inject attacks)


## Running Project

### `npm install`
Install all dependencies
```bash
    npm install && cd externalServer && npm install && cd ..
```

### `Start project`

```bash
    npm run start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Open an other console to start the external server
```bash
    cd externalServer && node .
```
Runs ExpressJS proyect on [http://localhost:3001], You should run this backend with [ngrok](https://ngrok.com/download) to make sure the attacker server is completely isolated from the frontend (different domain) to simulate more accurately the environment

## Before starting

Before starting working the tasks, I'd suggest creating a fork of this project, or cloning is also the same.

## Tasks!

The idea of this workshop is to cover the vulnerabilities from ALL sides possible. For example, If we're going to fix the xss issue not fixing it only on the javascript side but also preventing the cookies getting grabbed from javascript. I won't tell you HOW to fix the issues, I'll mention the tools to do so.
Now, without further ado lets go to the tasks

### Fist Tab -> Vulnerated Dependencies

Here we have a simple JSON builder passing a name and lastname, giving the possibility to change the object name. To build this we're using the lodash function [Template](https://lodash.com/docs/4.17.15#template) 

If we run 

```bash
    npm audit
```

We'll notice that on the project our version of Lodash has a Vulnerability, The most important one is the [Command Injection](https://security.snyk.io/vuln/SNYK-JS-LODASH-1040724) and is affecting the template function.

To confirm that the actual vuln is affecting this project, on the first input just put  "**){alert(document.cookie)}; with(obj**" (without the quotes) and we'll see prompting the alert with our ***login credential cookies***.


#### (Only for curious ones)
>If you're curious **WHY** is this happening, you can take a look by inspecting the page, go to sources, inside the 'localhost:3000' directory then inside of static/js directory we'll see **lodash.templateSources** and that's the function is being executed, try different values to see how was that working and why is that alert being executed. If can't see it don't hesitate to send me a message and I'll explain this to the root cause.

This is a easy fix because if you saw on [Lodash Command Injection](https://security.snyk.io/vuln/SNYK-JS-LODASH-1040724) report, just upgrading lodash fixes this. Keep in mind that sometimes in real life project upgrading is not an easy option, upgrading might mean braking changes and breaking changes mean headaches and headaches mean... well I guess you got me.

In this situation of course, we'll only upgrade the library. And should get fixed, try out again "**){alert(document.cookie)}; with(obj**" and should not prompt the alert (may break but at least is not being executed)

### Second Tab -> Url Injection

Here, the app asks for an URL containing an img to have as a profile picture. Seems harmless, they're just asking a profile pic what could possibly go wrong?

Well, turns out that here we can inject malicious URL. The URL is not malicious itself, but the content is.

Now lets inject a malicious content, go to the terminal you run ngrok server, copy the forwarding URL (Example: https://e602-190-57-211-204.ngrok-free.app) and put this value inside the input
**{ngrokUrl}/images/evil/document.cookie**

We'll see the alert prompting again, but what happened?
If you go to the svg file we're importing here (look for externalServer/public/svgtest.svg), it has a script inside. And here we're letting the attackers do whatever they want inside that script.
Big responsible for this is that we're using **iframe** to show the image, if we change that tag on the URLInjection component to **\<img\>**, the image will load but the script won't trigger. But the user can say "hey nice image lets take a closer look" and click and open the image on other tab and puf...

#### How to fix it?

Lets assume we're only accepting Pokemon images from **https://assets.pokemon.com/** (Example: https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png) so what we can do is not allowing the user to put other sources than that.
We can do that from javascript side, and also on the configuration side. Something called [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 

Try first to limit it from the CSP side, then make the corresponding filters on the javascript side.
Play a bit with all what you can restrict from CSP configuration.


### Third Tab -> XSS (Cross-site scripting)

To finish our profile configuration, here are two more inputs. One to fill your social media link (like facebook, instagram, etc) and the other to add a background color to our profile image.

Again, this can seem harmless, but the way this is done is vulnerable to XSS attacks.

#### First Input

On the first input if you make a quick test, try putting **javascript:alert(document.cookie)** and click "test profile link". You'll see, again, the alert prompt showing our login credentials. 

##### How do we fix this?

First, we SHOULD NOT allow the user to insert javascript values. Never.

Second, what we can do is, like the previous tab, only limit the user for a amount of social media profiles (pick the ones you like most)
With this two options should be enough, but be carefull, make sure you are definitely restricting the user. Take note that **javascript:alert(document.cookie)** is not the only attack vector, other example is **JaVaScript:alert(document.cookie)**.

#### Second Input

On the second Input, there's also a XSS vulnerability, but from another perspective. The passing props one.

Try putting 
```
{"style":{ "backgroundColor": "red", "width": "100px", "height": "100px"}, "dangerouslySetInnerHTML": { "__html": "<img src='a.com' onError='{alert(document.cookie)}' />" }}
```

What happened here? as you can see, there's a reactJS property called **dangerouslySetInnerHTML** that allows to inject plain HTML elements. And with that, we're injecting an img which src is not existing (on purpose) to execute the **onError** property to call the javascript inside it.

##### How do we fix this?

Well here is more like a context-dependent solution. The idea here is to fix de xss and keep the feature to generate the background to our profile image.


### Some extra configuration to take care of

If you noticed, on all this vulnerabilities we where able to pick the cookies from our site. Luckily there's a configuration to prevent this for further attacks we may have.
Take a look to [document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie#write_a_new_cookie) to see the different properties can have to prevent this.


### Bonus!

Inside this project, when it started, since it was a playground project we commited some sensitive values that cannot be public, and **MUST** be removed. Right now it got removed from the file (More specific in the App.js file) but it remains in the git history.

Github recomends [Git Filter repo](https://github.com/newren/git-filter-repo) to remove files from the history.
Try to remove the secret value from the git history. 


### Delivery terms

After finishing this tasks, you should share the repository to @NicolasMoreno on gitlab or @NicoMorenoSirius on github. 
Don't forget to send message to him on Slack after finishing!


Good luck!

