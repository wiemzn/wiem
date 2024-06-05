import React from "react";
import "./ComparaisonTable.css";

function ComparisonTable({ data }) {
  return (
    <div className="box">
      <table>
        <thead>
          <tr>
            <th>Nom complet</th>
            <th>Numéro d'identification</th>
            <th>Date de naissance</th>
            <th>Adresse</th>
          </tr>
        </thead>
        <tbody>
          {data.map((person) => (
            <tr key={person.idNumber}>
              <td>{person.fullName}</td>
              <td>{person.idNumber}</td>
              <td>{person.birthday}</td>
              <td>{person.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ComparisonTable;