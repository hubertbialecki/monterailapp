#Intro
Here is my app for your Junior Front-end developer reqruitment process. If you have any questions fell free to contact me by email - bialecki.hubert@gmail.com

**Task 1: Implement views**

I've implemented views. I've used font Cuprum. 

**Task 2: Make them responsive**

Responsive is implemented but I didn't have enought time to test it well. I missed follow button in single question view.

**Task 3: Connect modal to users**

I've implemented modal to users, but I've added only one user in user.json. It should work the same way as questions loading.

**Task 4: Use templates**

I've added three templates - for all questions, single question and user's modal. I emulated API by json's files (questions.json, users.json, discussion.json). I added only one discussion, so there is the same discussion under every single question.

**Task 5: Add pagination and sorting**

I've added loading posts by 3 per click, but it is unsorted in json and it is sorting after loaded, but I ran out of time to correct it. Sorting works on number in record, which emulate ordering (it should be ordered by date with recent filter on, and ordered by peers involved on clicking hot)

**Task 6: Add search**

I've added search form but there is no information if there are no results.

**Task 7: Implement voting**

I've implemented voting only on single qustion. By default questions aren't voted on, user can vote up and down, and change voting.

**Task 8: Add routing**

I've added routing, single question is recieved based on question's id. Users, as I've mentioned before, are fixed and only one user is in users.json.

## Run app
    $ npm install
    $ gulp
    $ app runs on localhost:8888/
