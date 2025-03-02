import Form from "@/components/Form";
import { editAdditionalDetails } from "./actions";
import { GENDER } from "@/constants/gender";
import { MARITAL_STATUS } from "@/constants/marital_status";

const handler = () =>  (
    <Form action={editAdditionalDetails}>
        <Form.Horizontal>
            <Form.Input name="date_of_birth" label="Date of Birth" required type="date" className="flex-1"/>
            <Form.Select name="gender" label="Gender" placeholder="Please choose a gender" options={GENDER} className="flex-1" />
            <Form.Select name="marital_status" label="Marital Status" placeholder="Please a marital status" options={MARITAL_STATUS} className="flex-1" />
        </Form.Horizontal>

        <Form.Divider>Address</Form.Divider>

        <Form.Horizontal>
            <Form.Input name="street_number" label="Street Number" placeholder="Street Number" required type="text" className="flex-1"/>
            <Form.Input name="street_name" label="Street Name" placeholder="Street Name" required type="text"  className="flex-1"/>
        </Form.Horizontal>
        <Form.Horizontal>
            <Form.Input name="postcode" label="Postcode" placeholder="Postcode" required type="text"  className="flex-1"/>
            <Form.Input name="city_town" label="City/Town" placeholder="City/Town" required type="text"  className="flex-1"/>
        </Form.Horizontal>

        <Form.Horizontal>
            <Form.Select name="state" label="State" placeholder="State" options={["Sarawak"]} className="flex-1"/>
        </Form.Horizontal>

        <Form.Horizontal>
            <Form.Button label="Cancel"/>
            <Form.Button label="Save" />
        </Form.Horizontal>
    </Form>
)

export default handler;