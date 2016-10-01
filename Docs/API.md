FEEDBACK SERVICE - API
=====================
+ **Unstable API**
+ **This API is subject to change.**

## Read access to API endpoints
### Get the forms filled by user.
```
GET /feedback/users/{user_id}
```
**Parameters**

| Place Holder | Description     |
| :------------- | :------------- |
|   user_id    | Identity of the user.       |

### Get feedback responses
```
GET /feedback/{feedback_id}/responses
```
**Parameters**

| Place Holder |  Description     |
| :------------- | :------------- |
| feedback_id       | FeedbackId of the feedback template.    |

### Add a new response to a particular feedback form
```
 POST /feedback/{feedback_id}/responses
```

**Parameters**

| Place Holder |  Description     |
| :------------- | :------------- |
| feedback_id       | FeedbackId of the feedback template.    |

### Get feedback form
```
GET /feedback/{feedback_id}/form
```
**Parameters**

| Place Holder |  Description     |
| :------------- | :------------- |
| feedback_id       | FeedbackId of the feedback template.    |

### Get feedback forms hosted by a particular author.
```
GET /feedback/author/{user_id}
```
**Parameters**

| Place Holder | Description     |
| :------------- | :------------- |
|   user_id    | Identity of the user.       |

### Create a new feedback template
```
POST /feedback/author/{user_id}
```
**Parameters**

| Place Holder | Description     |
| :------------- | :------------- |
|   user_id    | Identity of the user.       |
