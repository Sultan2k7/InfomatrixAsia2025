"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Edit, Trash } from "lucide-react";
import FileUpload from "@/components/shared/file-upload";
import FileList from "@/components/shared/file-list";

interface Driver {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  licenseNumber: string;
  status: string;
  vehicleAssigned: string;
  createdAt: string;
  address: string;
  birthDate: string;
  hireDate: string;
}

const DriverPage = () => {
  const [driver, setDriver] = useState<Driver | null>(null);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    fetchDriver();
  }, [id]);

  // Fetch driver data
  const fetchDriver = async () => {
    try {
      const response = await fetch(`/api/user/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch driver");
      }
      const data = await response.json();
      setDriver(data);
    } catch (error) {
      console.error("Error fetching driver:", error);
    }
  };

  if (!driver) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <Button
        variant="outline"
        onClick={() => router.push("/dashboard/users")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Назад к списку водителей
      </Button>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">{driver.name}</CardTitle>
              <CardDescription>{driver.email}</CardDescription>
            </div>
            <Badge
              variant={driver.status === "active" ? "default" : "secondary"}
            >
              {driver.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Контактная информация</h3>
              <p>Телефон: {driver.phoneNumber}</p>
              <p>Адрес: {driver.address}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Информация о водителе</h3>
              <p>Номер лицензии: {driver.licenseNumber}</p>
              <p>Дата рождения: {driver.birthDate}</p>
              <p>Дата найма: {driver.hireDate}</p>
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="font-semibold mb-2">Назначенное ТС</h3>
            <p>{driver.vehicleAssigned || "Не назначено"}</p>
          </div>

          <div className="mt-6 flex justify-end space-x-2">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" /> Редактировать
            </Button>
            <Button variant="destructive">
              <Trash className="mr-2 h-4 w-4" /> Удалить
            </Button>
          </div>

          <Separator className="my-4" />

          {/* File Upload Component */}
          <FileUpload driverId={id as string} />

          <Separator className="my-4" />

          {/* File List Component */}
          <FileList driverId={id as string} />
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverPage;
