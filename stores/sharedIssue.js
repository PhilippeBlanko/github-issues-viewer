import { defineStore } from "pinia";

export const useSharedIssueStore = defineStore('sharedIssue', {
  state: () => ({
    sharedIssue: null,
  }),
  actions: {
    loadSharedIssue() {
      const storedIssue = sessionStorage.getItem("sharedIssue");
      if (storedIssue) {
        this.sharedIssue = JSON.parse(storedIssue);
      }
    },
    setSharedIssue(issue) {
      this.sharedIssue = issue;
      sessionStorage.setItem('sharedIssue', JSON.stringify(issue));
    },
  }
});
