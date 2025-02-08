import { Point } from "../fakeApi";
import { Input } from "./Input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
    /*   onSubmit({
      ...data,
      valor: Number(data.valor), // Ensure numeric conversion
    }); */
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
          className="btn btn-circle hover:bg-gray-100 transition-colors"
          type="button"
          onClick={onClose}
          aria-label="Fechar formulário"
        >
          <i className="fa-solid fa-xmark" aria-hidden="true" />
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

          <Input
            id="badges"
            placeholder="Escolha as etiquetas desse pagamento (separadas por vírgula)"
            label="Etiquetas"
            {...register("badges")}
            error={errors.badges?.message}
          />
        </div>

        <button
          type="submit"
          className="w-full btn btn-primary"
          disabled={!isValid}
        >
          Salvar
        </button>
      </form>
    </aside>
  );
};
