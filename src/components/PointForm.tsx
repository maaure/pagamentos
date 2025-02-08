import { Point } from "../fakeApi";
import { Input } from "./Input";
import { useForm } from "react-hook-form";

interface PointFormProps {
  point?: Point;
  onSubmit: (point: Omit<Point, "id">) => void;
  onClose: () => void;
}

export const PointForm = ({ point, onSubmit, onClose }: PointFormProps) => {
  const { register, handleSubmit } = useForm();

  const submit = (data: any) => {
    console.log(data);
  };

  return (
    <aside className="h-screen flex flex-col p-6 gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Novo Pagamento</h2>
        <button
          className="btn btn-circle text-black"
          type="button"
          onClick={onClose}
        >
          <i className="fa-solid fa-xmark" />
        </button>
      </div>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex-1 flex flex-col gap-6"
      >
        <div className="space-y-4 flex-1">
          <Input
            placeholder="Nome do pagamento"
            label="Nome"
            {...register("nome")}
          />
          <Input
            placeholder="Diga algo sobre esse pagamento"
            label="Descrição"
            {...register("descricao")}
          />
          <Input
            placeholder="Digite o valor desse pagamento"
            label="Valor"
            {...register("valor")}
          />
          <Input
            placeholder="Procure pelo lugar onde este pagamento foi feito"
            label="Localização"
            {...register("localization")}
          />
          <Input
            placeholder="Escolha as etiquetas desse pagamento"
            label="Etiquetas"
            {...register("badges")}
          />
        </div>
        <button type="submit" className="w-full btn btn-primary">
          Salvar
        </button>
      </form>
    </aside>
  );
};
