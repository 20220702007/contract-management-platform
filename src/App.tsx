import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/Layout/MainLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { DashboardPage } from './pages/DashboardPage';
import { BlueprintPage } from './pages/BlueprintPage';
import { CreateBlueprintPage } from './pages/CreateBlueprintPage';
import { EditBlueprintPage } from './pages/EditBlueprintPage';
import { CreateContractPage } from './pages/CreateContractPage';
import { ContractDetailPage } from './pages/ContractDetailPage';
import { FieldLibraryPage } from './pages/FieldLibraryPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useBlueprintsStore } from './store/blueprintsStore';
import { useContractsStore } from './store/contractsStore';
import { useAuthStore } from './store/authStore';
import { useFieldLibraryStore } from './store/fieldLibraryStore';

function App() {
  const loadBlueprints = useBlueprintsStore((state) => state.loadBlueprints);
  const loadContracts = useContractsStore((state) => state.loadContracts);
  const loadAuth = useAuthStore((state) => state.loadAuth);
  const loadFieldLibrary = useFieldLibraryStore((state) => state.loadFieldLibrary);

  useEffect(() => {
    loadAuth();
    loadBlueprints();
    loadContracts();
    loadFieldLibrary();
  }, [loadAuth, loadBlueprints, loadContracts, loadFieldLibrary]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/blueprints" element={<BlueprintPage />} />
                  <Route
                    path="/blueprints/create"
                    element={<CreateBlueprintPage />}
                  />
                  <Route
                    path="/blueprints/:id/edit"
                    element={<EditBlueprintPage />}
                  />
                  <Route path="/field-library" element={<FieldLibraryPage />} />
                  <Route
                    path="/contracts/create"
                    element={<CreateContractPage />}
                  />
                  <Route path="/contracts/:id" element={<ContractDetailPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
