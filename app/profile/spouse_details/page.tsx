import Form from "@/app/_components/Form";
import { editSpouseDetails } from "./actions";


const handler = () =>  (
    <>
        <Form action={editSpouseDetails}>
            <Form.Select name="salutations" label="Salutations" placeholder="Salutations" options={["Mr", "Mrs", "Miss", "Dr"]}/>
            <div className="flex flex-row gap-5">
                <Form.Input name="first_name" label="First Name" placeholder="First Name" required type="text" className="flex-1"/>
                <Form.Input name="last_name" label="Last Name" placeholder="Last Name" required type="text" className="flex-1"/>
            </div>

            <div className="flex flex-row gap-5">
                <Form.Button label="Cancel"/>
                <Form.Button label="Save" />
            </div>
        </Form>
    </>
)

export default handler;