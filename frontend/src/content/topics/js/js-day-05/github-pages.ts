import type { ContentTopic } from '../../../types';

export const githubPagesTopics = {
  'github-pages': {
    id: 'github-pages',
    heading: 'Who can use this feature?',
    blocks: [
      {
        type: 'paragraph',
        text: "GitHub Pages is available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. See GitHub's plans.",
      },
      {
        type: 'paragraph',
        text: 'You can either create a repository or choose an existing repository for your site.',
      },
      {
        type: 'paragraph',
        text: 'If you want to create a GitHub Pages site for a repository where not all of the files in the repository are related to the site, you will be able to configure a publishing source for your site. For example, you can have a dedicated branch and folder to hold your site source files, or you can use a custom GitHub Actions workflow to build and deploy your site source files.',
      },
      {
        type: 'paragraph',
        text: 'If the account that owns the repository uses GitHub Free or GitHub Free for organizations, the repository must be public.',
      },
      {
        type: 'paragraph',
        text: 'If you want to create a site in an existing repository, skip to the Creating your site section.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'In the upper-right corner of any page, select , then click New repository.',
          'Use the Owner dropdown menu to select the account you want to own the repository.',
          "Type a name for your repository and an optional description. If you're creating a user or organization site, your repository must be named &lt;user&gt;.github.io or &lt;organization&gt;.github.io. If your user or organization name contains uppercase letters, you must lowercase the letters. For more information, see What is GitHub Pages?.",
          'Choose a repository visibility. For more information, see About repositories.',
          'Toggle Add README to On.',
          'Click Create repository.',
        ],
      },
      {
        type: 'paragraph',
        text: "Before you can create your site, you must have a repository for your site on GitHub. If you're not creating your site in an existing repository, see Creating a repository for your site.",
      },
      {
        type: 'paragraph',
        text: 'Warning',
      },
      {
        type: 'paragraph',
        text: "GitHub Pages sites are publicly available on the internet, even if the repository for the site is private (if your plan or organization allows it). If you have sensitive data in your site's repository, you may want to remove the data before publishing. For more information, see About repositories.",
      },
      {
        type: 'list',
        ordered: true,
        items: [
          "On GitHub, navigate to your site's repository.",
          'Decide which publishing source you want to use. See Configuring a publishing source for your GitHub Pages site.',
          'Create the entry file for your site. GitHub Pages will look for an index.html, index.md, or README.md file as the entry file for your site. If your publishing source is a branch and folder, the entry file must be at the top level of the source folder on the source branch. For example, if your publishing source is the /docs folder on the main branch, your entry file must be located in the /docs folder on a branch called main. If your publishing source is a GitHub Actions workflow, the artifact that you deploy must include the entry file at the top level of the artifact. Instead of adding the entry file to your repository, you may choose to have your GitHub Actions workflow generate your entry file when the workflow runs.',
          'Configure your publishing source. See Configuring a publishing source for your GitHub Pages site.',
          'Your GitHub Pages site is built and deployed with a GitHub Actions workflow. For more information, see Viewing workflow run history. Note GitHub Actions is free for public repositories. Usage charges apply for private and internal repositories that go beyond the monthly allotment of free minutes. For more information, see Billing and usage.',
        ],
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Under your repository name, click Settings. If you cannot see the "Settings" tab, select the dropdown menu, then click Settings.',
          'In the "Code, planning, and automation" section of the sidebar, click Pages.',
          'To see your published site, under "GitHub Pages," click Visit site.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Note',
      },
      {
        type: 'paragraph',
        text: "It can take up to 10 minutes for changes to your site to publish after you push the changes to GitHub. If you don't see your GitHub Pages site changes reflected in your browser after an hour, see About Jekyll build errors for GitHub Pages sites.",
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'If you are publishing from a branch and your site has not published automatically, make sure someone with admin permissions and a verified email address has pushed to the publishing source.',
          'Commits pushed by a GitHub Actions workflow that uses the GITHUB_TOKEN do not trigger a GitHub Pages build.',
        ],
      },
      {
        type: 'paragraph',
        text: 'GitHub Pages publishes any static files that you push to your repository. You can create your own static files or use a static site generator to build your site for you. You can also customize your own build process locally or on another server.',
      },
      {
        type: 'paragraph',
        text: 'If you use a custom build process or a static site generator other than Jekyll, you can write a GitHub Actions workflow to build and publish your site. GitHub provides workflow templates for several static site generators. For more information, see Configuring a publishing source for your GitHub Pages site.',
      },
      {
        type: 'paragraph',
        text: "If you publish your site from a source branch, GitHub Pages will use Jekyll to build your site by default. If you want to use a static site generator other than Jekyll, we recommend that you write a GitHub Actions to build and publish your site instead. Otherwise, disable the Jekyll build process by creating an empty file called .nojekyll in the root of your publishing source, then follow your static site generator's instructions to build your site locally.",
      },
      {
        type: 'paragraph',
        text: 'Note',
      },
      {
        type: 'paragraph',
        text: 'GitHub Pages does not support server-side languages such as PHP, Ruby, or Python.',
      },
      {
        type: 'paragraph',
        text: 'A MIME type is a header that a server sends to a browser, providing information about the nature and format of the files the browser requested. GitHub Pages supports more than 750 MIME types across thousands of file extensions. The list of supported MIME types is generated from the mime-db project.',
      },
      {
        type: 'paragraph',
        text: "While you can't specify custom MIME types on a per-file or per-repository basis, you can add or modify MIME types for use on GitHub Pages. For more information, see the mime-db contributing guidelines.",
      },
      {
        type: 'paragraph',
        text: 'You can add more pages to your site by creating more new files. Each file will be available on your site in the same directory structure as your publishing source. For example, if the publishing source for your project site is the gh-pages branch, and you create a new file called /about/contact-us.md on the gh-pages branch, the file will be available at https://&lt;user&gt;.github.io/&lt;repository&gt;/about/contact-us.html.',
      },
      {
        type: 'paragraph',
        text: 'You can also add a theme to customize your site’s look and feel. For more information, see Adding a theme to your GitHub Pages site using Jekyll.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'About GitHub Pages and Jekyll.',
          'Troubleshooting Jekyll build errors for GitHub Pages sites',
          'Managing branches within your repository',
          'Creating new files',
          'Troubleshooting 404 errors for GitHub Pages sites',
        ],
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
