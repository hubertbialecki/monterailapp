**Task 1: Implement views**

I've implemented views. I've used font Cuprum. 

**Task 2: Make them responsive**

Responsive is implemented but i didn't have enought time to test it well. I missed follow button in single question view.

**Task 3: Connect modal to users**

I've implemented modal to users, but I've added only one user in user.json. It should works same as questions loading.

**Task 4: Use templates**

I've added three templates - for all questions, single question and user's modal. I emulated API by json's files (qustions.json, users.json, discussion.json). I added only one discussion, so there is the same discussion under every single question.

**Task 5: Add pagination and sorting**

I've added loading posts by 3 per click, but it is unsorted in json and it is sorting after loaded, but I was run out of time to correct it. Sorting works on number in record, which emulating ordering (it should be ordered by date with recent filter on, and ordered by peers involved on clicking hot)

**Task 6: Add search**

I've added search form.

**Task 7: Implement voting**

I've implemented voting only on single qustion. By default qustions isn't voted, user can vote up and down, and change voting.

**Task 8: Add routing**

I've added routing, single qustions is recived by id. User's as I've mentioned before are fixed and only one user is in users.json.

**Run app**

'''
$npm install
$gulp
'''
