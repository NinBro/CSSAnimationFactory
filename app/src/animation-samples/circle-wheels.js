export default {
  elements: [
    {
      name: 'circleOne',
      type: 'div',
      elements: [
        {
          name: 'circleOne-child',
          type: 'div'
        },
        {
          name: 'circleOne-child-two',
          type: 'div'
        },
        {
          name: 'circleOne-child-three',
          type: 'div'
        }
      ]
    }
  ],
  timelines : [
    {
      timelineName : 'circleOne',
      classNames : 'logo',
      descendants : [
        {
          timelineName : 'circleOne-child',
          classNames : 'rings',
          type : 'normal',
          animationProperties : {
            animationDirection : 'normal',
            duration : '5s',
            iteration : 'infinite',
            timingFunction : 'ease'
          },
          keyframes : [
            {
              position : 0,
              css : ' transform: rotate(0deg);'
            },
            {
              position : 100,
              css : ' transform: rotate(360deg);'
            }
          ]
        },
        {
          timelineName : 'circleOne-child-two',
          classNames : 'rings',
          type : 'normal',
          animationProperties : {
            animationDirection : 'reverse',
            duration : '4s',
            iteration : 'infinite',
            timingFunction : 'ease'
          },
          keyframes : [
            {
              position : 0,
              css : ' transform: rotate(0deg);'
            },
            {
              position : 100,
              css : ' transform: rotate(360deg);'
            }
          ]
        },
        {
          timelineName : 'circleOne-child-three',
          classNames : 'rings',
          type : 'normal',
          animationProperties : {
            animationDirection : 'normal',
            duration : '3s',
            iteration : 'infinite',
            timingFunction : 'ease'
          },
          keyframes : [
            {
              position : 0,
              css : ' transform: rotate(0deg);'
            },
            {
              position : 100,
              css : ' transform: rotate(360deg);'
            }
          ]
        }
      ],
      type : 'normal',
      animationProperties : {
        animationDirection : 'normal',
        duration : '10s',
        iteration : 'infinite',
        timingFunction : 'linear'
      }
    }
  ],
  previewContentCSS : 'background: #DB5956;',
  rawCSS : ".content * {  box-sizing: border-box;} .preview {  background: #DB5956;} .logo {  width: 230px;  height: 230px;  margin: 40px auto;  position: relative;}.rings {  border-radius: 50%;  border: 10px solid #fff;  position: absolute;  top: 0;  bottom: 0;  left: 0;  right: 0;  margin: auto;}.rings:before, .rings:after {  content: '';  position: absolute;  width: 25px;  height: 25px;  background: #fff;  border-radius: 50%;}.rings:before {  top: -18px;  left: 0;  right: 0;  margin: auto;}.rings:after {  bottom: -18px;  left: 0;  right: 0;  margin: auto;}.rings:first-of-type {  width: 230px;  height: 230px;}.rings:first-of-type:before {  box-shadow: 5px 0 0 #DB5956;}.rings:first-of-type:after {  box-shadow: -5px 0 0 #DB5956;}.rings:nth-of-type(2) {  width: 150px;  height: 150px;  transform: rotate(90deg);}.rings:nth-of-type(2):before {  box-shadow: -5px 0 0 #DB5956;}.rings:nth-of-type(2):after {  box-shadow: 5px 0 0 #DB5956;}.rings:nth-of-type(3) {  width: 70px;  height: 70px;  transform: rotate(45deg);}.rings:nth-of-type(3):before {  box-shadow: 5px 0 0 #DB5956;}.rings:nth-of-type(3):after {  box-shadow: -5px 0 0 #DB5956;}"
};