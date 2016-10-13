# FoldingAnimation
Just a simple React Native animation to fold/unfold a view component. This component uses the Animated API to set three `transform` properties on the style.


    transform: [
        { perspective: -2000 },
        { translateY: 80 },
        { rotateX: '90deg' },
    ],
      

## Example
![Fold/unfold animation](https://media.giphy.com/media/3otOKDBh9ZtSnWOgiQ/giphy.gif)

## Run this project
- Install React Native CLI
- Install the depencies `npm i`
- Run the app `react-native run-ios`
