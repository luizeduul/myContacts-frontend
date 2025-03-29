import { useLocation, useNavigate } from "react-router-dom";

export default function withRouter(Component) {
    return (props) => {

      const location = useLocation();
      const navigate = useNavigate();

      return (
        <Component {...props}  location={location} navigate={navigate} />
      )
    }
}
