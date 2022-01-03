# WebApp (Truvian Backend) Release Notes

## v1.0.2

- Version 1.0.2
- Version: WA-1.0.2 
- Date of Release: 11-18-2021 

## :100: Summary

- Fixed the john ploand address findings related to Absorbance exported csv, updated the model naming schema convention and pathToRun for File explorer

## :rocket: New Features 

- Added PathToRun in hematology modality for file explorer of filtered data

## :beetle: Bug Fixes

- TRUV-148 : Model schema naming convention updated 66dba22
- TRUV-160 : Add pathtorun for haematology modality cae1f90
- TRUV-154 : Tru Test: Address Absorbance findings 2e4f2a4

## :boom: Known Issues 

- NA

---
## v1.0.1

- Version 1.0.0
- Version: WA-1.0.0 
- Date of Release: 11-15-2021 

## :100: Summary

- Model schema naming convention done 

## :rocket: New Features 

- NA

## :beetle: Bug Fixes

- TRUV-148 : Model schema naming convention updated 0e24a25


## :boom: Known Issues 

- NA

---


## v1.0.0

- Version 1.0.0
- Version: WA-1.0.0 
- Date of Release: 11-11-2021 

## :100: Summary

- All the supporting API's needed for the Web Application are created. API's such as Filter API (Both clinical Chemistry and Hematology), Filtered Data retrevial API, Download CSV API, Manual Data entry API, Fetch manual/run record API, Associate manual-run (hematology) API, Edit manual data, Deassociate manual-run API etc.

## :rocket: New Features 

- Added API to get data for filter dropdown's under export tab in UI.
- Added API for Filtering data for Clinical chemistry and Hematology.
- Added API for export download CSV for Clinical chemistry.
- Added API for export download csv for Hematology.
- Added API Manual Data Entry Save for Hematology.
- Added API to get Manual entered records.
- Added API to get Available Non associated Runs for Hematology.
- Added API to Associate Manual-Run for Hematology.
- Added API for Editing the Manual data for Hematology
- Added API to deassociate manual-run association.

## :beetle: Bug Fixes


- TRUV-104 : Web App UI with filters and CSV download (9b455b7,979e45f,6b6e112,ff15d47,8d7af29)

## :boom: Known Issues

- Backend code is not deployed on Azure Devops for automatic deployment.
- Comments: NA