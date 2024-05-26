import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Toolbar, SaveButton, DeleteButton, Button } from 'react-admin';
import { Box } from '@mui/material';

const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    marginLeft: theme.spacing(1),
    padding: theme.spacing(1, 4),
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.secondary.light,
    },
    '& .MuiButton-label': {
        display: 'flex',
        alignItems: 'center',
    },
}));

const BackButton = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <CustomButton label="Back" onClick={handleBack} />
    );
};

const CustomToolbarEdit = () => (
    <Toolbar>
        <Box display="flex" justifyContent="space-between" width="100%">
            <Box display="flex">
                <SaveButton style={{ padding: '12px 24px', minWidth: '88px', minHeight: '36px' }} />
                <BackButton />
            </Box>
            <DeleteButton />
        </Box>
    </Toolbar>
);

const CustomToolbarCreate = () => (
    <Toolbar>
        <Box display="flex" justifyContent="space-between" width="100%">
            <Box display="flex">
                <SaveButton style={{ padding: '12px 24px', minWidth: '88px', minHeight: '36px' }} />
                <BackButton />
            </Box>
        </Box>
    </Toolbar>
);

export { CustomToolbarEdit, CustomToolbarCreate}
