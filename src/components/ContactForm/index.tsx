import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";

export default function ContactForm({ buttonLabel }: { buttonLabel: string }) {
	return (
		<form>
			<FormGroup>
				<Input type="text" placeholder="Nome" />
			</FormGroup>

			<FormGroup>
				<Input type="text" placeholder="E-mail" />
			</FormGroup>

			<FormGroup>
				<Input type="text" placeholder="Telefone" />
			</FormGroup>

			<FormGroup>
				<Select>
					<option value="123">Instagram</option>
					<option value="123">Instagram</option>

				</Select>
			</FormGroup>

			<div className="mt-6">
				<Button typeButton="submit" wFull={true}>
					{buttonLabel}
				</Button>
			</div>
		</form>
	);
}

