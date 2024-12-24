import { defineStore } from "pinia";

export const useSharedIssuesStore = defineStore('sharedIssues', {
  state: () => ({
    sharedIssues: [],
  }),
  actions: {
    loadSharedIssues() {
      const storedIssues = sessionStorage.getItem("sharedIssues");
      if (storedIssues) {
        this.sharedIssues = JSON.parse(storedIssues);
      }
    },
    addSharedIssue(issue, position = "end") {
      if (position === "start") {
        this.sharedIssues.unshift(issue);
      } else {
        this.sharedIssues.push(issue);
      }
      sessionStorage.setItem("sharedIssues", JSON.stringify(this.sharedIssues));
    },
    removeSharedIssue(issueNumber) {
      this.sharedIssues = this.sharedIssues.filter(issue => issue.number !== parseInt(issueNumber, 10));
      sessionStorage.setItem("sharedIssues", JSON.stringify(this.sharedIssues));
    },
    removeAllSharedIssues() {
      this.sharedIssues = [];
      sessionStorage.removeItem("sharedIssues");
    },
  }
});
