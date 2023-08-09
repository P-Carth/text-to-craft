import axios from "axios";

export async function getGithubRepos() {
  try {
    const response = await axios.get(
      `https://api.github.com/users/P-carth/repos`
    );
    const repoUrls = response.data.map((repo) => repo.html_url);
    return JSON.stringify(repoUrls);
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
}

export async function getAvailableBlocks() {
  //   numStrawberries = Math.floor(Math.random() * 10);

  try {
    return JSON.stringify(["wood", "stone"]);
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
}
