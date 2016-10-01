FEEDBACK SERVICE - Database Schema
================================

### FeedbackStatus Table
This table contains the list of students alongwith the list of feedbacks they have filled.

**FeedbackStatus**

| Attribute     | Type     | Description  |
| :------------- | :------------- | :------  |
|   userID     | String       |  Student Identity provided to each  student.  |
|   feedbackID      | Array      |   List of IDs of feedback templates for which feedback has been filled.

### Responses Table

This table contains the actual Feedback responses.

**Responses**

| Attribute    | Type     |  Description |
| :------------- | :------------- | :------ |
| feedbackID | String | Feedback ID |
|   responses    |  Array   |  An array of response objects where response object contains the response of that particular feedback.

### Template Table

This table stores the templates of each feedback and assigns a unique feedbackID to them. It also stores the userID so keeping information about who created this form.

 **Template**

| Attribute    | Type     |  Description |
| :------------- | :------------- | :------ |
| feedbackID       | String     |  Unique Identity of each feedback template. |
| userID  | String | UserID of the author of the feedback template. |
| questionID | Array | It is array of objects where each object is a question alongwith their possible responses.|
| isOfficial | Enumeration | An enumeration depicting whether the feedback template is official or not.|
