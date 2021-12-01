# AdminDocs

Front-end of Admin docs.

AdminDocs(name WIP :smirk:) is a personal project to learn, practice and test my react native capabilities, based on a real-world necessity.
To summarize it up: it stores images of documents(camera or gallery) as documents that can be later reviwed, filtered and seen.

## Why?

I worked several years(more than 10 years, in fact) in something I don't even know how to call it in english: administración de fincas... property administrator, property management?
Anyway, it's a company that manage buildings maintenance, accounting and what not.

Usually floor owners need to send to the company the invoices, mails, etc., that would be sent to the building.
Nowadays you can take a photo and send it by whatsapp or email.
Chats like whatsapp are not very professional and are not accepted legally in Spain in case you need the document in the court.
Email is ok, but you know what happens, first they can get lost or simply not seen at all among the ton of emails the company recieves every day, and second and more important: it's slower for the customer, encouraging the use of chats that, again, are a bad solution.
Usually, companies and managers solves this just sending the documents with chats, and going later to the buildings to take the physical document when/if needed.

## So...

With the final version of this app the owners can take a photo to a physical document or pick a document from the gallery, fill a tiny form with the document data, and upload it to a Mongo Atlas database, where it'll be stored just in a moment.

Ideally, the app will be coupled with a web app where managers and allowed users could see, download, and share the documents. Those users should also be able to recieve push notifications when someone of their building upload a document.

Not much more to say, if you are about to judging or using it, remember it's an open source, totally free, created for learning project.

---

## Design

I'm sharing here the design just in terms of portfolio :stuck_out_tongue_winking_eye:

[Here](https://drive.google.com/file/d/1X_Y3uc0x9paGKGTcP_39kMJHS01E3DxY/view?usp=sharing) you can see initial wireframes(comment only link to google drive).

[In figma](https://www.figma.com/file/MfKYdAnGaODyKm7FfZU3rB/AdminDocs?node-id=0%3A1) you can see the design as it is right now(view only link).

Take in mind that design is NOT my thing: f.i. icons and logos are made of free ones found in internet.

---

## Back-end

You can find the back-end of the app [here on github](https://github.com/NoxLP/AdminDocsBack).
It's a REST API made with Javascript, NodeJs, ExpressJs and Multer/sharp for the images uploads, that connects to a Mongo Atlas database uusing Mongoose.

It's better documented than this one, so take a look if you're interested.

---

## Expo & Typescript

Since the app will be a little one, and I don't have that much experience with react native, I'm using expo to facilitate things.

I thought I should say something about using Typescript instead of Javascript directly... don't wonder too much about it, I was interested in practicing Typescript, that's all :stuck_out_tongue_closed_eyes:

I'll be filling this section (when I have the time) with a 'howto' use the app with expo.
