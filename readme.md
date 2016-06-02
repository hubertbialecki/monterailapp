**Task 1: Implement views**

Your first task is to implements 3 base views of this project: list of questions (all_questions_base.png), single question view (single_question_base.png) and user profile (profile_base.png). Bottom line is just static view, with HTML markup and CSS stylesheets, however you can connect them with links for easy switching from view to view.

**Task 2: Make them responsive**

User profile and single questions view have additional versions for tablet and mobile. For all questions view use additional material which pictures way the single story box is changing with responsiveness. How should other interface elements act for different viewports? Came up with your own solution for this part.

**Task 3: Connect modal to users**

As you noticed so far, user profile is displayed as modal. Write necessary logic for displaying user profile modal while visiting both question views and show this modal whenever user avatar or name is clicked.

**Task 4: Use templates**

If so far you've coded all the content for questions, comments and profile data within HTML now is time to leverage that to templates. Make the data reside in dedicated data structures and collections. Every place that can potentially hold varying content should use templates and fill it with data from collections. If you feel competent enough try mocking API requests but all the data still can be fixed (no backend is needed for this project, but if you know how to talk to JSON API, here is your chance to show how it's done from browser side).

**Task 5: Add pagination and sorting**

All questions view has interface dedicated for sorting questions - use it and implement sorting items displayed here. At the bottom of list is 'load more questions' command. Add functionality which shows additional number of questions within this view when clicked (all the data can be fixed even if it means repeating items).

**Task 6: Add search**

All questions view has search form. Use it for implementing simple search system and let it show only items related to provided query (when search is run with empty query just show all the items, like by default visit to this view).

**Task 7: Implement voting**

Single question view contains comments and answers with voting component. Implement voting component, so viewer can rate entries as helpful or not.

**Task 8: Add routing**

If so far views were connected just by standard hyperlinks, now it's time to go SPA way - combine all views in single app and make them switch without reloading browser.
