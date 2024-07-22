import { withPageFactory } from "@/components/hoc/pageFactory";

function WithSteps1() {
  return <>WithSteps1</>;
}

export default withPageFactory({
  fetchUrl: "fetchUrl",
  fetchParam: "fetchParam",
})(WithSteps1);
