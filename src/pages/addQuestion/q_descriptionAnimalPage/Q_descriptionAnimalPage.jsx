import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FormHeader from "../../../components/formHeader/FormHeader";
import LineHeader from "../../../components/lineHeader/LineHeader";
import s from "./q_descriptionAnimalPage.module.css";
import FileUploader from "../../../components/fileUploader/FileUploader";
import { useForm } from "react-hook-form";
import CustomInput from "../../../components/customInput/CustomInput";
import CustomCheckbox from "../../../components/customCheckbox/CustomCheckbox";
import close from "../../../assets/close.svg";
import CustomButtonSubmit from "../../../components/customButtonSubmit/CustomButtonSubmit";

const Q_descriptionAnimalPage = () => {
  const { t } = useTranslation();
  const [files, setFiles] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
  });

  const onUpload = (uploadedFiles) => {
    const fileData = uploadedFiles.map((file) => ({
      data: URL.createObjectURL(file),
      type: file.type,
    }));
    setFiles(fileData);
  };

  const onSubmit = (data) => {
    const formData = {
      petArt: data.petArt,
      petWeight: data.petWeight,
      petGender: data.petGender,
      isHomeless: isCheckboxChecked,
      files: files,
    };

    navigate("/main/question/description-animal/send", { state: formData });
  };

  const handleHomelessChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const petArt = watch("petArt");
  const petWeight = watch("petWeight");
  const petGender = watch("petGender");

  const isFormValid = isValid && petArt && petWeight && petGender;

  return (
    <div className={s.q_descriptionAnimalPage}>
      <div className={s.q_descriptionAnimalPage_header}>
        <FormHeader path="/main" fontSize={36} titleKey={t("questionPage.title")} />
        <Link to={"/main"}>
          <img className={s.closeBtn} src={close} alt="close" />
        </Link>
      </div>
      <LineHeader middle={"var(--color-main)"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>{t("descriptionAnimalPage.addMedia")}</p>
        <FileUploader maxFiles={3} boxSize={104} borderRadius={20} onUpload={onUpload} />
        <label style={{ alignSelf: "start" }}>
          {t("descriptionAnimalPage.petArt")}{" "}
          <span style={{ color: "#2A9D8F" }}>
            {t("descriptionAnimalPage.requiredSymbol")}
          </span>
        </label>
        <CustomInput
          {...register("petArt", {
            required: t("descriptionAnimalPage.validationMessages.petArt.required"),
            minLength: {
              value: 2,
              message: t("descriptionAnimalPage.validationMessages.petArt.minLength"),
            },
          })}
          color={"var(--color-text-dark)"}
          placeholder={t("descriptionAnimalPage.petArtPlaceholder")}
          borderColor="var(--color-main)"
          width={328}
        />
        {errors.petArt && <p style={{ color: "red" }}>{errors.petArt.message}</p>}
        <label style={{ alignSelf: "start" }}>
          {t("descriptionAnimalPage.petWeight")}{" "}
          <span style={{ color: "#2A9D8F" }}>
            {t("descriptionAnimalPage.requiredSymbol")}
          </span>
        </label>
        <CustomInput
          {...register("petWeight", {
            required: t("descriptionAnimalPage.validationMessages.petWeight.required"),
            minLength: {
              value: 2,
              message: t("descriptionAnimalPage.validationMessages.petWeight.minLength"),
            },
          })}
          color={"var(--color-text-dark)"}
          placeholder={t("descriptionAnimalPage.petWeightPlaceholder")}
          borderColor="var(--color-main)"
          width={153}
        />
        {errors.petWeight && <p style={{ color: "red" }}>{errors.petWeight.message}</p>}
        <label style={{ alignSelf: "start" }}>
          {t("descriptionAnimalPage.petGender")}{" "}
          <span style={{ color: "#2A9D8F" }}>
            {t("descriptionAnimalPage.requiredSymbol")}
          </span>
        </label>
        <CustomInput
          {...register("petGender", {
            required: t("descriptionAnimalPage.validationMessages.petGender.required"),
            minLength: {
              value: 2,
              message: t("descriptionAnimalPage.validationMessages.petGender.minLength"),
            },
          })}
          color={"var(--color-text-dark)"}
          placeholder={t("descriptionAnimalPage.petGenderPlaceholder")}
          borderColor="var(--color-main)"
          width={153}
        />
        {errors.petGender && <p style={{ color: "red" }}>{errors.petGender.message}</p>}
        <span className={s.checkboxBox}>
          <CustomCheckbox
            {...register("confirmation")}
            name="confirmation"
            onChange={handleHomelessChange}
            checked={isCheckboxChecked}
          />{" "}
          <span>{t("descriptionAnimalPage.homelessCheckbox")}</span>
        </span>
        <div className={s.btnBox}>
          <CustomButtonSubmit
            text={t("descriptionAnimalPage.continueButton")}
            padding={"16px 120.5px"}
            disabled={!isFormValid}
          />
        </div>
      </form>
    </div>
  );
};

export default Q_descriptionAnimalPage;
