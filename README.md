















project

Interview portal

statement of work


















Customers:        
Yauhen Papko
 Fiodar Rukadzelnikau

Developers:
  Viktar Hrynko
Yauheni Verameichyk
Ilya Nikalayeu  
Contents

Description	2
Requirement	2
Roles	2
Case Study	3
Technical Requirements	3
Assumption	5
Use case	8
Guest	8
Authorization	8
Coordinator	9
Look list discipline	9
Add new discipline form	10
Edit discipline form	11
Look user`s list	12
Add user form	13
Edit user form	14
Discipline Head	15
Look through disciplines and sub-item(discipline)	15
Add/Edit sub-item(discipline)	16
View user's list	17
Add new user	18
Edit interviewer	19
View User Form	20
View page with interviews	21
Page interview (passed)	22
Page interview (wait)	23
Human  Resources	24
candidates page	24
Create/edit new candidate	25
Interviews page	26
Create new interview	27
Interviewer	28
view disciplines list	28
View interviews list	29
Edit interview	30
View a candidate’s profile	31
Specify availability time slots	32

Description

Interview Portal Application should help to organise Interview scheduling and feedback consolidation. It should allow Human Resources to find available interviewers in specific disciplines, Interviewer can conduct interview and provide feedback in formalized way.


Requirement
Roles

Coordinator
Adds Disciplines
Adds Discipline Heads
Adds Interviewers, assigns them to discipline
Adds Human Resources

Discipline Head
Creates areas of competence, sub-items
Reviews history results for his/her discipline (Candidates that passed interviews, their marks)
Adds interviewers to his discipline

Interviewer
Can view assigned interviews
Can specify availability time slots
Can proceed interview with marks/feedback for specific areas, sub-items
Can review historical interviews proceeded by him/her 

Human Resource
Creates Candidates.
Fills in Candidate profile (e.g. discipline, name, education ...)
Reviews availability schedules of Interviewers for particular Discipline
Assigns Candidates to specific one or more Interviewers
Reviews results of interviews



Case Study

Coordinator C1 logs into Interviews portal.
C1 creates disciplines: ‘Java’, ‘.NET’
C1 creates Discipline Head DH1 and assigns him as Java Discipline Head.
C1 creates Human Resource HR1

DH1 logs into Interviews portal.
DH1 creates area of competence ‘Java Core’
DH1 creates sub items ‘Collections’, ‘Exceptions’
DH1 adds Interviewer I1.

HR1 logs into Interviews portal.
HR1 creates Candidate C1 and provides name, education and so on
HR1 reviews availability of Interviewers in Java Discipline for particular time slot (April, 26, from 10 AM till 5 PM)
HR1 assigns Candidate C1 to Interviewer I1 at specific time and location.

Interviewer I1 log into Interviews Portal
I1 specifies availability time 10 AM - 1 PM each Tuesday and Wednesday
I1 reviews assigned interviews
I1 starts interview with C1 and fills in Interview form. After Interview finished I1 submits form with the marks and feedback


Technical Requirements

Front-end:
SPA
Angular 2
TypeScript
Sass
Webpack 2
NPM (no bower/grunt/gulp)



Back-end:
Spring boot
Spring mvc
Spring security
Spring data
Swagger for documentation
Hibernate
Junit/mockito
maven/gradle


Track everything that related to one request in log using MDC
Use Swagger documentation for one controller to understand how it works
Use JMX console to view and update one parameter in application
Use one json format to return any errors that occur in application


Assumption

Roles:
·         Coordinator
·         Discipline head
·         Interviewer
·         Human Resource

Coordinator:
Candidates - none
Interviews - none
HR - CRUD
DH - CRUD
discipline - CRUD, but update without adding sub-themes
interviewers - CRUD
 
Discipline head:
Interviewers - CRUD, but only in his discipline
Candidates - CRUD, but only in his discipline
Interviews - CRUD, but only in his discipline
discipline - view all, but filter by default on his discipline only. Can add sub-themes to his discipline
HR - none
 
Interviewer:
interview - view assigned to him only and set feedback/marks
calendar - CRUD
discipline - view all, but filter by default on his discipline only
HR - none
Candidate - view assigned
 
HR:
Interview - CRUD
Candidate - CRUD
Interviewer - none
DH - none
discipline - only through candidate (in his skills)

Pages:
·         Interviews
·         Disciplines
·         Users
·         Calendar
·         Candidates

Candidates list page
This page is available for HR only. Here HR can view candidates list, create a new candidate or edit/remove existing ones.
Candidate page
This page can be viewed by HR, DH or Interviewer (DH and Interviewer navigate on this page from Interviews page).  Edit candidate’s profile can only HR.
Coordinator cannot see this page.
 
Interviews list page
Coordinator cannot see this page.
Discipline head can view interviews, candidates or assign himself to the interview as Interviewer, but do all this only in scope of his Discipline.
Interviewer can view and edit only assigned to him interviews.
HR able to perform all CRUD operations with all Interviews.
 
Interview page.
Coordinator cannot see this page.
Discipline head can view this page, and assign himself to the interview as Interviewer, but do all this only in scope of his Discipline.
Interviewer can see and edit interview (set feedback/marks), but only for assigned to him Interviews.
HR is the one who creates Interview, assign Candidate, Interviewer and appropriate time.
 
Users list page
HR and Interviewer cannot see this page.
Coordinator can view all users (DHs, HRs, Interviewers and Coordinators), create, edit or remove them.
Discipline Head can view Interviewers and DHs, but only in his discipline scope. He can edit or remove Interviewers, but not other DHs.
 
Disciplines page
 
Coordinator can perform all CRUD operations with disciplines but cannot create sub-items.
Discipline Head can view all disciplines, but default filter is set on his Discipline (Disciplines) only. DH can add sub-items for his Discipline (Disciplines).
Interviewer can view all disciplines, but default filter is set on his Discipline (Disciplines) only.
HR cannot see this page.
 
Calendar
 
This page is available for Interviewer only, here he can specify availability time slots.

Use case
Guest
Authorization


Main role
Coordinator, HD, Interviewer, HR ,System
goal
User sign In in system, and start works.
System verification user and determinants his rights 
Successful script 
1)  User open main page where write login and password 
2) The system checks the login and password.
3) System gives permission if login and password are correct


Result
User works in system
Extensions
If user login or password entered incorrect, System return Message error





Coordinator
Look list discipline


Main role
Coordinator,System
goal
Coordinator click on link Disciplines where he can view list disciplines
Successful script 
1)  Coordinator stay on main page where he click on link disciplines.
2) System find all disciplines in system
3) System shows the disciplines list on the page, also he can see button: “Add Discipline”
4) Coordinator can edit and delete discipline. for this he must click on button with image pencil or cross. 


Result
Coordinator look disciplines list
Extensions
No access to the database. System return Message error





Add new discipline form




Main role
Coordinator,System
goal
Coordinator add new discipline 
Successful script 
1)  Coordinator stays on add discipline form page where he write title Discipline and assign additional Head.
2) System add new discipline in system
3) System shows the disciplines list on the page, and success message.


Result
Coordinator add new discipline and  looks through disciplines list and success message
Extensions
Discipline did not add.  No access to the database. System return Message error



Edit discipline form 


Main role
Coordinator,System
goal
Coordinator edit discipline 
Successful script 
1)  Coordinator on edit discipline form page where he edit title Discipline and remap Head.
2) System update discipline in system
3) System shows the disciplines list on the page, and success message.


Result
Coordinator update discipline and  looks through disciplines list and success message
Extensions
Discipline did not update.  No access to the database. System return Message error
Look user`s list



Main role
Coordinator,System
goal
Coordinator click on link  “Users” where he can look list  it, filter and  button: Add User. Also he can edit and remove user
Successful scenario 
1)  Coordinator stay on main page where he click on link Users.
2) System find all users in system
3) System output it on the page, also he can see button: Add User  and filter


Result
Coordinator look user`s list
Extensions
No access to the database. System return message error


Add user form 


Main role
Coordinator,System
goal
Coordinator create user
Successful scenario 
1)  Coordinator  chooses  link “Add User”
2) Coordinator enter user data.
3) Coordinator chooses roles.
4) if he chooses DH appears fields, chooses discipline 
5) When fields entered he clicks create
Result
Coordinator add user and  looks through users list and success message
Extensions
User did not add.  No access to the database. System return Message error

Edit user form 


Main role
Coordinator,System
goal
Coordinator edit user
Successful scenario 
1)  Coordinator  chooses  user
2) Coordinator edit user data.
3) Coordinator edit roles.
4) When fields entered he clicks save
Result
Coordinator edit user and  looks through users list and success message
Extensions
User did not add.  No access to the database. System return Message error

Discipline Head
Look through disciplines and sub-item(discipline)


Main role
DH,System
goal
DH look through discipline
Successful scenario 
1)  DH look through discipline
2)  DH  look through sub-item discipline 
3) DH can see buttons: ‘add area’, ‘add Sub-Items’, ‘delete’, ‘edit’
Result
DH look through discipline and sub-items
Extensions
No access to the database. System return Message error



Add/Edit sub-item(discipline) 


Main role
DH,System
goal
DH add/edit area/sub-item
Successful scenario 
1)  DH enter/edit Area/sub-item title;
2) DH enter/edit Area/sub-item description;
3) DH click add/save
Result
DH create new Area/Sub-Item and click add, or edit exist area/sub-items
Extensions
No access to the database. System return Message error

View user's list


Main role
DH,System
goal
DH  view users(interviews and Discipline Head, but only in his discipline scope) and CRUD operation on interviewers.
Successful scenario 
1)  DH click on link “Users”
2) System shows the page with  list of users.
3) DH can create new interviewers by clicking on button “Create interviewer”
4) DH can edit and remove by clicking on appropriate buttons.
Result
DH open users page and look through list of users
Extensions
No access to the database. System return Message error

Add new user 


Main role
DH,System
goal
DH  add new interviewer in system
Successful scenario 
1)  DH opens create user form
2) Enter data
3) Assigning interviewer for disciplines
4) Click button “Create”
5) If all right, system returns success message 
Result
DH create new Interviewer in system and assign for discipline.
Extensions
No access to the database. System return Message error

Edit interviewer


Main role
DH,System
goal
DH  edit interviewer in system
Successful scenario 
1)  DH open edit interviewer form
2) Change data
3) Assigning interviewer for disciplines ( can choose only his disciplines)
4) Click button “Save”
5) If all right, system returns success message 
Result
DH create new Interviewer in system and assign for discipline.
Extensions
No access to the database. System return Message error

View User Form




Main role
DH,System
goal
DH  view personal page of user
Successful scenario 
1)  DH click on user
2) System shows the page with  information about user: 
name
surname
phone
role`s list
list of discipline 

Result
DH  view personal page of user.
Extensions
No access to the database. System return Message error

View page with interviews 



Main role
DH,System
goal
DH  view interviews, and field “filter”
Successful scenario 
1)  DH click on link “Interviews”
2) Open page with interviews list
3) befor list he can see field filters
4) DH can view interview by clicking by row to table 
Result
DH open interviews page and look through interviews list
Extensions
No access to the database. System return Message error

Page interview (passed)


Main role
DH,System
goal
DH  view interview
Successful scenario 
1)  DH choose “Interview” and click
2) Open page with interview
3) DH look through information about interview
4) Data: interview id, status, candidate, time, 
feedback, interviewers, mark
Result
DH open interview page and look through interview information
Extensions
No access to the database. System return Message error

Page interview (wait)



Main role
DH,System
goal
DH  view interview
Successful scenario 
1)  DH choose “Interview” and click
2) Open page with interview
3) DH look through information about interview
4) Data: interview id, status, candidate, time, 
interviewers
5) Can join the interview
Result
DH open interview page and look through interview information
Extensions
No access to the database. System return Message error

Human  Resources
candidates page


Main role
HR,System
goal
HR  look through  candidate, and CRUD operation on him.
Successful scenario 
1)  HR click on menu item “Candidates”
2) Open page with candidate`s list
3)  HR click on the button “Add Candidate”, after that open window for candidate creation. 
4) HR can edit or remove candidate by clicking on appropriate button.
Result
HR opens candidate page and sees list with candidates.
Extensions
If no candidates are found or no access to the server, then we see error message.

Create/edit new candidate

Main role
HR,System
goal
HR  fills in input fields, clicks button “apply”, after that create new candidate.
Successful scenario 
1)  HR writes in field “name” new candidate`s name; 
2) Enters  surname
3) Inserts phone
4) Inscribe table “Education”, if candidate has an education.
5) Inscribe table “Work History”, if candidate had work
6) Select discipline in field “Choose discipline”. If candidate has more than one skill, HR clicks on the “add additional discipline” button, after then System creates new “Choose discipline” field;
7)  System make validation of entered data, then if data is no correct, system show message.
8)  HR clicks on the “Apply” button, create new candidate;
9) System show message of successful creating.
Result
HR creates new candidate
Extensions
If no access to the server, then we see error message.
Interviews page


Main role
HR,System
goal
HR  look through  interviews, and create them.
Successful scenario 
1)  HR click on menu item “Interviews”
2) Open page with interview`s list.
3) HR can apply filters for table;
3)  HR click on the button “Add Interview”, after that open window for Interview creation. 
Result
HR opens interview page and sees list with candidates. And If need, he can create new interview.
Extensions
If no interview are found or no access to the server, then we see error message.

Create new interview


Main role
HR,System
goal
HR  fills in input fields, clicks button “apply”, after that create new interview.
Successful scenario 
1) HR selects discipline in field “Select discipline”.
2) Choose candidate in field “Select candidate”.
3) Choose interviewers in field “Select Interviewers”
4) HR selects date, where will be held interview;
5) System make validation of selected date, if date on correct, System show message about it;
6) HR clicks on the “Add Interview”, create new interview.
Result
HR creates new interview.
Extensions
If no access to the server, then we see error message.

Interviewer
view disciplines list

Use case:  view all disciplines list
Main role
Interviewer, System
goal
Interviewer view all disciplines list
Successful scenario
Interviewer can view disciplines list. Filter is set to his disciplines only by default
Interviewer clicks button “all” in filter and all disciplines are exposed
Interviewer can view areas and sub-items by clicking on row of discipline or row of  area.

Result
Interviewer views all disciplines list
Extensions
No access to the database. System return Message error
View interviews list


Use case:  view interviews list
Main role
Interviewer, System
goal
Interviewer views interviews list
Successful scenario
1)  Interviewer can view assigned to him interviews list.
2) Interviewer can view some interview by clicking on row to table 
Result
Interviewer views interviews list
Extensions
No access to the database. System returns Message error


Edit interview


Main role
Interviewer, System
goal
Interviewer edits interview from list
Successful scenario
1)	Interviewer open assigned to him interviews list.
2)	Interviewer click on interview and opens an edit interview form.
3)	There Interviewer fills inputs for common feedback and marks/comments for candidate’s disciplines and sub-items. 
4)      Changes are saved by click on submit button, status changes automatically from “wait” to “passed” after submitting changes.
Result
Interviewer saves interview results in the database
Extensions
No access to the database. System returns Message error

View a candidate’s profile


Main role
Interviewer, System
goal
Interviewer views a candidate profile
Successful scenario
1)      Interviewer open interview of  list
2)      Click on the candidate name
3)	Interviewer views a profile of assigned to him candidate
Result
Interviewer views a candidate profile
Extensions
No access to the database. System returns Message error

Specify availability time slots



Main role
Interviewer, System
goal
Interviewer specifies available time slots
Successful scenario
1)      Interviewer open calendar
2)      Creates events for days and time when he can participate in interview
Result
Time slots are specified and available for HR to assign interview
Extensions
No access to the database. System returns Message error

