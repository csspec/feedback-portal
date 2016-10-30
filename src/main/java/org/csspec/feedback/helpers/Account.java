package org.csspec.feedback.helpers;

public class Account {
    private String userid;
    private String username;
    private String role;
    private String email;

    public Account() {}
    public Account(String userid, String username, String role, String email) {
        this.userid = userid;
        this.username = username;
        this.role = role;
        this.email = email;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String toString() {
        return "Account <" + getUserid() + ">: " + getUsername() + " (" + getRole() + ")";
    }
}
