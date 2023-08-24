# Check Pull Request review comments (Github action) 

This action helps to enforce some conventions in pull requests comments. It can check that comments do include some
piece of text or that it does *not* include another piece of text.

## Inputs

### `comments-must-contain`

Check that the given text appears in pull request body.

## Outputs

None.

## Example usage

    - name: Check Pull Request comments
      uses: actions/check-pr-review-comments@v0
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}  # Required to to act on pull request through GitHub API 
      with:
        comments-must-contain: 'Security Review'
