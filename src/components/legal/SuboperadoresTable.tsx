import { suboperadores } from "../../../content/legal/suboperadores";

export function SuboperadoresTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-surface-muted text-xs font-semibold uppercase tracking-wide text-ink-subtle">
          <tr>
            <th scope="col" className="px-4 py-3">
              Nome
            </th>
            <th scope="col" className="px-4 py-3">
              Finalidade
            </th>
            <th scope="col" className="px-4 py-3">
              Dados envolvidos
            </th>
            <th scope="col" className="px-4 py-3">
              País
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line bg-surface-raised">
          {suboperadores.map((row) => (
            <tr key={row.nome} className="align-top">
              <td className="px-4 py-3 font-medium text-ink">{row.nome}</td>
              <td className="px-4 py-3 text-ink-muted">{row.finalidade}</td>
              <td className="px-4 py-3 text-ink-muted">{row.dadosEnvolvidos}</td>
              <td className="px-4 py-3 text-ink-muted">{row.pais}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
