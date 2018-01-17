import { createMuiTheme } from 'material-ui/styles';
import { red, pink, lime } from 'material-ui/colors';

/*helper

primaryColor #E91E63

darkPrimaryColor #C2185B

lightPrimaryColor #F8BBD0

secondaryColor #FF9800

white #FFFFFF

black #212121

darkGrey #757575

grey #BDBDBD

*/

class theme {
  switchStyle = (type) =>{
    switch(type){
      case 'primaryColor':
        return this.renderTheme.palette.primary.main;
      case 'darkPrimaryColor':
        return this.renderTheme.palette.primary.dark;
      case 'lightPrimaryColor':
        return this.renderTheme.palette.primary.light;
      case 'secondaryColor':
        return this.renderTheme.palette.secondary.main;
      case 'white':
        return '#FFFFFF';
      case 'black':
        return '#212121';
      case 'darkGrey':
        return '#757575';
      case 'grey':
        return '#BDBDBD';
      case 'none':
        return '';
      default:
        return 'inherit';
    }
  }
  getRowStyle = (color, bgColor) => {
    return {
      color: this.switchStyle(color),
      backgroundColor: this.switchStyle(bgColor)
    }
  }
  renderTheme = createMuiTheme({
    palette: {
      primary: {
        ...pink,
      },
      secondary: {
        ...lime,
      },
    },
    status: {
      danger: red[500],
    },
  });
}

const themeInstance = new theme();

export { themeInstance as theme }
