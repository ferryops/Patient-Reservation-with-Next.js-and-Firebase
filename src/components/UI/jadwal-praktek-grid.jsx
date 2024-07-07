import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { H1 } from "../Font";

export default function JadwalPraktekGrid({ jadwal }) {
  const jadwalPraktek = Object.keys(jadwal).map((hari) => ({
    hari,
    data: jadwal[hari],
  }));

  const renderCardContent = (dokter) => {
    return (
      <CardBody key={`${dokter.dokter}-${dokter.spesialisasi}`}>
        <p>
          <strong>{dokter.dokter}</strong>
        </p>
        <p>Spesialisasi: {dokter.spesialisasi}</p>
        {dokter.jam_mulai && <p>Jam Mulai: {dokter.jam_mulai}</p>}
        {dokter.jam_selesai && <p>Jam Selesai: {dokter.jam_selesai}</p>}
      </CardBody>
    );
  };

  return (
    <div className="w-full flex flex-col gap-4 p-10">
      <H1>Jadwal Praktek</H1>
      {jadwalPraktek.map((item) => (
        <div key={item.hari} className="w-full flex flex-col gap-4">
          <h2 className="text-2xl">{item.hari}</h2>
          <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6">
            {item?.data?.length > 0 ? (
              <>
                {item.data.map((dokter, index) => (
                  <Card key={`${index}-${dokter.dokter}`}>{renderCardContent(dokter)}</Card>
                ))}
              </>
            ) : (
              <p className="text-small tracking-tight text-default-400">Tidak ada jadwal parktek di hari {item.hari}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
