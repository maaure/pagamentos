import { Point } from "../fakeApi";
import { Input } from "./Input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TagInput } from "./TagInput";

interface PointFormProps {
  point?: Omit<Point, "id">;
  onSubmit: (point: Omit<Point, "id">) => void;
  onClose: () => void;
}

type PointFormData = {
  nome: string;
  descricao: string;
  valor: number;
  localization: string;
  badges?: string;
};

const MAX_DESCRIPTION_LENGTH = 100;

const validationSchema = yup.object({
  nome: yup.string().required("O nome é obrigatório"),
  descricao: yup
    .string()
    .required("A descrição é obrigatória")
    .max(
      MAX_DESCRIPTION_LENGTH,
      `A descrição não pode exceder ${MAX_DESCRIPTION_LENGTH} caracteres`,
    ),
  valor: yup
    .number()
    .required("O valor é obrigatório")
    .typeError("O valor deve ser numérico")
    .positive("O valor deve ser positivo"),
  localization: yup.string().required("A localização é obrigatória"),
  badges: yup.string().optional(),
});

export const PointForm = ({ point, onSubmit, onClose }: PointFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<PointFormData>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      nome: point?.name,
      descricao: point?.description,
      valor: point?.value,
      badges: point?.badges.join(", "),
    },
  });

  const handleFormSubmit = (data: PointFormData) => {
    console.log(data);
  };

  return (
    <aside
      className="h-screen flex flex-col p-6 gap-6"
      aria-labelledby="form-header"
    >
      <div className="flex justify-between items-center">
        <h2 id="form-header" className="text-lg font-semibold">
          {point ? "Editar Pagamento" : "Novo Pagamento"}
        </h2>
        <button
          className="btn btn-circle btn-ghost"
          type="button"
          onClick={onClose}
          aria-label="Fechar formulário"
        >
          <i className="fa-solid fa-xmark" />
        </button>
      </div>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex-1 flex flex-col gap-6"
        noValidate
      >
        <div className="space-y-4 flex-1">
          <Input
            id="nome"
            placeholder="Nome do pagamento"
            label="Nome"
            {...register("nome")}
            error={errors.nome?.message}
          />

          <Input
            id="descricao"
            placeholder="Diga algo sobre esse pagamento"
            label="Descrição"
            {...register("descricao")}
            error={errors.descricao?.message}
          />

          <Input
            id="valor"
            placeholder="Digite o valor desse pagamento"
            label="Valor"
            type="number"
            currency="R$"
            step="0.01"
            {...register("valor")}
            error={errors.valor?.message}
          />

          <Input
            id="localization"
            placeholder="Procure pelo lugar onde este pagamento foi feito"
            label="Localização"
            {...register("localization")}
            error={errors.localization?.message}
          />

          <TagInput
            placeholder="Insira as etiquetas desse pagamento"
            label="Categorias"
            value={getValues("badges")}
            {...register("badges")}
          />
        </div>

        <button
          type="submit"
          className="w-full btn btn-secondary"
          disabled={!isValid}
        >
          {point ? "Salvar alterações" : "Adicionar pagamento"}
        </button>
      </form>
    </aside>
  );
};
