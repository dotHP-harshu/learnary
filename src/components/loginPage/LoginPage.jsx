import Signup from "./Signup";
import SignIn from "./SignIn";

function LoginPage() {
  return (
    <Flex minH={"dvh"} justifyContent={"center"} alignItems={"center"}>
      <SignIn />
    </Flex>
  );
}

export default LoginPage;
