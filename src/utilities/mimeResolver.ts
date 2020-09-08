import { Unit, Reference } from "../definition";
import { Maybe } from "graphql/jsutils/Maybe";

interface MimeObject {
    type: Maybe<string>
    category: Maybe<string>
    tag: Maybe<string>
}

const mimeResolver: (arg: Unit | Reference) => MimeObject = ({__mime }) => {
    const split = __mime.match(/^((([a-z]+)\/([a-z]+)){1}(\+([a-z]+))?)$/);
    return {
        type: split ? split[3] : null,
        category: split ? split[4] : null,
        tag: split ? split[6] : null,
    }
}

export default mimeResolver;
