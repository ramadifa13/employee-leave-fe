"use client";

import { Employee } from "@/commons/types";
import { useGetEmployeesPaginatedQuery, useUpdateEmployeeMutation, useAddEmployeeMutation } from "@/services/api";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const EmployeesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "update" | "detail">("add");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const { data, isLoading, refetch } = useGetEmployeesPaginatedQuery({
    page: currentPage,
    limit: 5,
  });
  
  const [updateEmployee] = useUpdateEmployeeMutation();
  const [addEmployee] = useAddEmployeeMutation();

  const openModal = (type: "add" | "update" | "detail", employee: Employee | null = null) => {
    setModalType(type);
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleUpdate = async (updatedEmployee: Employee) => {
    if (selectedEmployee?.id) {
      await updateEmployee({ id: selectedEmployee.id, data: updatedEmployee });
      refetch();  
    }
    setIsModalOpen(false);
  };

  const handleAdd = async (newEmployee: Employee) => {
    await addEmployee(newEmployee);
    setIsModalOpen(false);
  };

  if (isLoading) return <p>Loading...</p>;

  const employees = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Employees</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => openModal("add")}
        >
          Add Employee
        </button>
      </div>
      <table className="min-w-full bg-white border rounded shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">#</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">
                {employee.firstName} {employee.lastName}
              </td>
              <td className="py-2 px-4 border-b">{employee.email}</td>
              <td className="py-2 px-4 border-b">{employee.phone}</td>
              <td className="py-2 px-4 border-b space-x-2">
                <button
                  className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                  onClick={() => openModal("detail", employee)}
                >
                  Detail
                </button>
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  onClick={() => openModal("update", employee)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-black"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {isModalOpen && (
        <Modal
          type={modalType}
          employee={selectedEmployee}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default EmployeesPage;


const Modal = ({
  type,
  employee,
  onClose,
  onAdd,
  onUpdate,
}: {
  type: "add" | "update" | "detail";
  employee?: Employee | null;
  onClose: () => void;
  onAdd?: (employee: Employee) => void;
  onUpdate?: (employee: Employee) => void;
}) => {
  const { register, handleSubmit, reset } = useForm<Employee>({
    defaultValues: employee || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      gender: "",
    },
  });

  const onSubmit = (data: Employee) => {
    if (type === "add" && onAdd) onAdd(data);
    if (type === "update" && onUpdate) onUpdate(data);
    reset();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-y-auto">
      <div className="bg-white rounded shadow-md w-full max-w-md mx-auto p-6 max-h-screen overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">
          {type === "add" && "Add Employee"}
          {type === "update" && "Update Employee"}
          {type === "detail" && "Employee Detail"}
        </h2>

        {type === "detail" ? (
          <div>
            <p><strong>Name:</strong> {employee?.firstName} {employee?.lastName}</p>
            <p><strong>Email:</strong> {employee?.email}</p>
            <p><strong>Phone:</strong> {employee?.phone}</p>
            <p><strong>Address:</strong> {employee?.address}</p>
            <p><strong>Gender:</strong> {employee?.gender}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label>First Name</label>
              <input
                {...register("firstName")}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                {...register("lastName")}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label>Email</label>
              <input
                {...register("email")}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label>Phone</label>
              <input
                {...register("phone")}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label>Address</label>
              <input
                {...register("address")}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label>Gender</label>
              <select
                {...register("gender")}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {type === "add" ? "Add" : "Update"}
            </button>
          </form>
        )}
        <button
          className="mt-4 w-full bg-gray-300 text-black py-2 rounded hover:bg-gray-400"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

