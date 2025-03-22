# AnoNotes - WebApp

**AnoNotes** is a fun and simple web app where users can create a link, share it with their friends, and receive anonymous messages, funny notes, or feedback. The user can view all the responses received through the shared link.

### Features:
- Create and share anonymous links.
- Submit anonymous messages and notes via the link.
- View all responses received using the link.
- Simple and clean interface.

### Tech Stack:
- **MongoDB**: NoSQL database for storing messages.
- **Express.js**: Web framework for handling routes and server-side logic.
- **React**: Frontend for building a responsive user interface.
- **Node.js**: Backend runtime environment.

# NLP - Integration

Anonymous messages that users send may contain harmful content or bad words, which may affect the receiver's mental health. So I integrate an NLP solution to address this issue. 

### For Bad word detecting : 

To detect bad words I defined a list of bad words in Sinhala Singlish, and when users send messages, they check against the list to find any bad words in their texts. If any bad word exists it will show a warning and will now send to the target user

### For harmful content :

detecting harmful content in all 3 languages was challenged. I used 4 models to overcome this.
- 1 : model to detect Singlish harmful texts
- 2 : model to detect Sinhala harmful texts
- 3 : model to detect English harmful texts
- 4 : model to identify English and Sinhala separately
-  
